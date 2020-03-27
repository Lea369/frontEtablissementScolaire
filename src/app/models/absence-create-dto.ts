import { EtudiantUpdateDto } from './etudiant-update-dto';

export class AbsenceCreateDto {

    dateStart: string;
	dateEnd: string;
	justif: string;
	descript: string;
    etudiant: EtudiantUpdateDto;
    
}
