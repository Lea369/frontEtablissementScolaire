import { EtudiantUpdateDto } from './etudiant-update-dto';
import { ExamenUpdateDto } from './examen-update-dto';

export class NoteCreateDto {
    value:number;
    etudiant: EtudiantUpdateDto;
    examen: ExamenUpdateDto;
}
