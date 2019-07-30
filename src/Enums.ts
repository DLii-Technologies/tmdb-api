/**
 * Status codes for responses
 */
export enum StatusCode {
	Success                = 1,
	InvalidService         = 2,
	Unauthorized           = 3,
	InvalidFormat          = 4,
	InvalidParameters      = 5,
	InvalidId              = 6,
	InvalidApiKey          = 7,
	DuplicateEntry         = 8,
	ServiceOffline         = 9,
	SuspendedAPIkey        = 10,
	InternalError          = 11,
	RecordUpdateSuccess    = 12,
	RecordDeleteSuccess    = 13,
	AuthenticationFailed   = 14,
	UnknownError           = 15,
	DeviceDenied           = 16,
	SessionDenied          = 17,
	ValidationFailed       = 18,
	InvalidAcceptHeader    = 19,
	InvalidDateRange       = 20,
	EntryNotFound          = 21,
	InvalidPage            = 22,
	InvalidDate            = 23,
	Timeout                = 24,
	LimitReached           = 25,
	MissingRequiredFields  = 26,
	TooManyResponseObjects = 27,
	InvalidTimezone        = 28,
	ConfirmationRequired   = 29,
	InvalidCredentials     = 30,
	AccountDisabled        = 31,
	EmailNotVerified       = 32,
	InvalidRequestToken    = 33,
	NotFound               = 34
}

/**
 * @TODO Most likely temporary
 */
export enum Sort {
	CreatedAtAsc  = "created_at.asc",
	CreatedAtDesc = "created_at.desc"
}

/**
 * Movie status
 */
export enum Status {
	Canceled       = "Canceled",
	InProduction   = "In Production",
	Planned        = "Planned",
	PostProduction = "Post Production",
	Released       = "Released",
	Rumored        = "Rumored"
}

export enum MediaType {
	Movie  = "movie",
	Person = "person",
	Tv     = "tv"
}

export enum VideoType {
	BehindTheScenes = "Behind the Scenes",
	Bloopers        = "Bloopers",
	Clip            = "Clip",
	Featurette      = "Featurette",
	OpeningCredits  = "Opening Credits",
	Recap           = "Recap",
	Teaser          = "Teaser",
	Trailer         = "Trailer"
}

/**
 * TV episode groups support seven different types
 */
export enum EpisodeGroupType {
	OriginalAirDate = 1,
	Absolute        = 2,
	Dvd             = 3,
	Digital         = 4,
	StoryArc        = 5,
	Production      = 6,
	Tv              = 7
}

export enum ExternalSource {
	Imdb        = "imdb_id",
	FreebaseMid = "freebase_mid",
	Freebase    = "freebase_id",
	TvDb        = "tvdb_id",
	TvRage      = "tvrage_id",
	Facebook    = "facebook_id",
	Twitter     = "twitter_id",
	Instagram   = "instagram_id"
}
