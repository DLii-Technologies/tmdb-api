import { IMediaModel } from "./core";
import { IMovie }      from "./movie";
import { ISeries }     from "./tv";

interface IPersonBase {
	adult       : boolean;
	popularity  : number;
	profile_path: string | null;
	id          : number;
	name        : string;
}

export interface IPerson extends IPersonBase, IMediaModel {
	known_for: IMovie[] | ISeries[];
}

export interface IPersonDetails extends IPersonBase {
	also_known_as       : string[];
	biography           : string;
	birthday            : string | null;
	deathday            : string | null;
	gender              : number;
	homepage            : string | null;
	imdb_id             : string;
	known_for_department: string;
	place_of_birth      : string | null;
}
