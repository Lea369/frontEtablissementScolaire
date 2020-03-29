import { SexeEnum } from '../enums/sexe-enum.enum';
import { ClasseUpdateDto } from './classe-update-dto';

export class EtudiantCreateDto {
    adress: string;
    city: string;
    identity: number;
    mail: string;
    name: string;
    phone: number;
    postalCode: number;
    s: SexeEnum;
    surname: string;
    classe: ClasseUpdateDto;
}
