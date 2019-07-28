/**
 * Movie status
 */
export enum Status {
	Canceled       = "Canceled",
	InProduction   = "InProduction",
	Planned        = "Planned",
	PostProduction = "PostProduction",
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
