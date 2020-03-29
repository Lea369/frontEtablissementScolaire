import { EtudiantUpdateDto } from './etudiant-update-dto';

export class MatiereCreateDto {
    nomMatiere: string;
    listeEtudiant= new Array<EtudiantUpdateDto>();
}
