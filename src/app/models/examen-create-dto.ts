import { TypeEnum } from '../enums/type-enum.enum';
import { MatiereUpdateDto } from './matiere-update-dto';

export class ExamenCreateDto {

    dateExamen: string;
	
	typeExamen: TypeEnum;
	
	coefExamen: number;
	
	matiereExamen: MatiereUpdateDto;

}
