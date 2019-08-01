export interface IResponse {
	status_code   : number;
	status_message: string;
}

export interface IRequestTokenResponse {
	success      : boolean;
	expires_at   : string;
	request_token: string;
}

export interface IGuestSessionResponse {
	success         : boolean;
	guest_session_id: string;
	expires_at      : string;
}

export interface ICreateSessionResponse {
	success   : boolean;
	session_id: string;
}

export interface IDeleteSessionResponse {
	success: boolean;
}

export interface IListCreateResponse extends IResponse {
	list_id: number;
	success: boolean;
}
