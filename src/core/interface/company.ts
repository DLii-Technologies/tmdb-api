export interface ICompany {
	id       : number;
	logo_path: string | null;
	name     : string;
}

export interface IProductionCompany extends ICompany {
	origin_country: string;
}

export interface ICompanyDetails extends IProductionCompany {
	description   : string;
	headquarters  : string;
	homepage      : string;
	parent_company: IProductionCompany | null;
}

export interface INetwork extends ICompany {
	origin_country: string;
}

export interface INetworkDetails {
	id            : number;
	headquarters  : string;
	homepage      : string;
	name          : string;
	origin_country: string;
}
