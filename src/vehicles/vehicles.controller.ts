import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { LoggedUser } from '../users/user.decorator';
import { LoginGuard } from '../auth/login.guard';
import { User } from '../users/user.entity';
import { VehiclesService } from './vehicles.service';
import { vehiclesDto } from './dto/vehicles.dto';
import { HttpMessage } from 'src/common/utils/messages/http-message.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Vehicles')
@Controller('vehicles')
@UseGuards(LoginGuard)
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) { }

  @Get()
  async getVehicles() {
    return await this.vehiclesService.getVehicles();
  }

  @Get('/:id')
  async getVehicleById(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ) {
    const vehicle = await this.vehiclesService.getVehicleById(id);

    if (!vehicle) {
      throw new HttpException(
        HttpMessage.VEHICLE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return vehicle;
  }

  @Post()
  async createVehicle(@LoggedUser() user: User, @Body() body: vehiclesDto) {
    //User isAdmin checks can be made
    const plateExists = await this.vehiclesService.plateExists(body.plate);

    if (plateExists) {
      throw new HttpException(
        `${HttpMessage.VEHICLE_PLATE_ALREADY_EXISTS} : ${body.plate}`,
        HttpStatus.CONFLICT,
      );
    }
    return await this.vehiclesService.createVehicle(body);
  }

  @Put('/:id')
  async updateVehicle(
    @LoggedUser() user: User,
    @Body() body: vehiclesDto,
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ) {
    //User isAdmin checks can be made
    const vehicle = await this.vehiclesService.getVehicleById(id);

    if (!vehicle) {
      throw new HttpException(
        HttpMessage.VEHICLE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    if (vehicle.plate !== body.plate) {
      const plateExists = await this.vehiclesService.plateExists(body.plate);

      if (plateExists) {
        throw new HttpException(
          `${HttpMessage.VEHICLE_PLATE_ALREADY_EXISTS} : ${body.plate}`,
          HttpStatus.CONFLICT,
        );
      }
    }

    return await this.vehiclesService.updateVehicle(vehicle, body);
  }

  @Delete('/:id')
  async deleteVehicleById(
    @LoggedUser() user: User, 
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string, 
  ) {
    //User isAdmin checks can be made
    const vehicle = await this.vehiclesService.getVehicleById(id);

    if (!vehicle) {
      throw new HttpException(
        HttpMessage.VEHICLE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.vehiclesService.deleteVehicle(vehicle);
  }

}
