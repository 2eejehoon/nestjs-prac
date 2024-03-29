import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateUserSettingDto {
  @IsBoolean()
  @IsOptional()
  smsEnabled?: boolean;

  @IsBoolean()
  @IsOptional()
  notificationOn?: boolean;
}
