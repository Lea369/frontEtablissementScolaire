import { EtudiantCreateDto } from './etudiant-create-dto';
import { EtudiantUpdateDto } from './etudiant-update-dto';

export class NoteCreateDto {
    value:number;
    etudiant: EtudiantUpdateDto;
    examen: null;
}
