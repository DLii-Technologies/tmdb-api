import { ISeriesDetails,
         ISeriesContentRatings,
         IEpisodeGroups,
         IEpisodeDetails,
         IEpisodeGroupDetails,
         ISeasonDetails,
         ITheatricalScreenings } from "./interface/tv";
import { ISeasonAccountStates,
         IEpisodeAccountState,
         ISeriesAccountState }   from "./interface/account";
import { IAlternativeNames,
         IKeywordsAlt,
         ITvWatchProviders,
         IWatchProvidersResults } from "./interface/info";
import { ICredits,
         IEpisodeCredits,
         IAggregateCredits }     from "./interface/credits";
import { ISeriesExternalIds,
         ISeasonExternalIds,
         IEpisodeExternalIds }   from "./interface/external";
import { IImages,
         IVideos,
         ISeasonImages,
         IEpisodeImages }        from "./interface/media";
import { ISeriesResults }        from "./interface/results";
import { ITranslations,
         IEpisodeTranslation,
         ISeasonTranslation,
         ISeriesTranslation }    from "./interface/language";
import { IResponse }             from "./interface/response";
import { get, post, del }        from "./util/network";

export let tv = {

	// TV Series -----------------------------------------------------------------------------------

	/**
	 * Get the details for a TV show
	 */
	getSeriesDetails(apiKey: string, seriesId: number, language?: string) {
		return get<ISeriesDetails>(apiKey, `tv/${seriesId}`, { language });
	},

	/**
	 * Grab the account states for a session
	 */
	getSeriesAccountStates(apiKey: string, seriesId: number, sessionId?: string,
		guestSessionId?: string, language?: string)
	{
		return get<ISeriesAccountState>(apiKey, `tv/${seriesId}/account_states`, {
			guest_session_id: guestSessionId,
			session_id: sessionId,
			language
		});
	},

	/**
	 * Get the aggregate credits for a TV show
	 */
	 getSeriesAggregateCredits(apiKey: string, seriesId: number, language?: string) {
		return get<IAggregateCredits>(apiKey, `tv/${seriesId}/aggregate_credits`, { language });
	},

	/**
	 * Get the alternative titles for a TV show
	 */
	getSeriesAltTitles(apiKey: string, seriesId: number, language?: string) {
		return get<IAlternativeNames>(apiKey, `tv/${seriesId}/alternative_titles`, {
			language
		});
	},

	/**
	 * Get the list of content ratings (certifications) that have been added to a TV show
	 */
	getSeriesContentRatings(apiKey: string, seriesId: number, language?: string) {
		return get<ISeriesContentRatings>(apiKey, `tv/${seriesId}/content_ratings`, {
			language
		});
	},

	/**
	 * Get the credits (cast and crew) of a TV show
	 */
	getSeriesCredits(apiKey: string, seriesId: number, language?: string) {
		return get<ICredits>(apiKey, `tv/${seriesId}/credits`, {language});
	},

	/**
	 * Get all episode groups that have been created for a TV show
	 */
	getSeriesEpisodeGroups(apiKey: string, seriesId: number, language?: string) {
		return get<IEpisodeGroups>(apiKey, `tv/${seriesId}/episode_groups`, {language});
	},

	/**
	 * Get the list of external IDs for a TV show
	 */
	getSeriesExternalIds(apiKey: string, seriesId: number, language?: string) {
		return get<ISeriesExternalIds>(apiKey, `tv/${seriesId}/external_ids`, {language});
	},

	/**
	 * Get a list of images for a TV show
	 */
	getSeriesImages(apiKey: string, seriesId: number, language?: string) {
		return get<IImages>(apiKey, `tv/${seriesId}/images`, { language });
	},

	/**
	 * Get the list of keywords for a TV show
	 */
	getSeriesKeywords(apiKey: string, seriesId: number) {
		return get<IKeywordsAlt>(apiKey, `tv/${seriesId}/keywords`);
	},

	/**
	 * Get the list of TV show recommendations for a TV show
	 */
	getSeriesRecommendations(apiKey: string, seriesId: number, page?: number, language?: string) {
		return get<ISeriesResults>(apiKey, `tv/${seriesId}/recommendations`, { language, page });
	},

	/**
	 * Get a list of seasons or episodes htat have been screened in a film festival or theater
	 */
	getTheatricalScreenings(apiKey: string, seriesId: number) {
		return get<ITheatricalScreenings>(apiKey, `tv/${seriesId}/screened_theatrically`);
	},

	/**
	 * Get a list of similar TV shows
	 */
	getSimilarShows(apiKey: string, seriesId: number, page?: number, language?: string) {
		return get<ISeriesResults>(apiKey, `tv/${seriesId}/similar`, { language, page });
	},

	/**
	 * Get the list of translations that exdist for a TV show
	 */
	getSeriesTranslations(apiKey: string, seriesId: number, language?: string) {
		return get<ITranslations<ISeriesTranslation>>(apiKey, `tv/${seriesId}/translations`,
			{ language });
	},

	/**
	 * Get the list of watch providers for the given TV show. **Must** credit *justWatch* if used!
	 */
	 getSeriesWatchProviders(apiKey: string, seriesId: number) {
		return get<IWatchProvidersResults<ITvWatchProviders>>(apiKey,
			`tv/${seriesId}/watch/providers`);
	},

	/**
	 * Get the videos that have been added to a TV show
	 */
	getSeriesVideos(apiKey: string, seriesId: number, language?: string) {
		return get<IVideos>(apiKey, `tv/${seriesId}/videos`, { language });
	},

	/**
	 * Rate a TV show
	 */
	rateSeries(apiKey: string, seriesId: number, value: number, sessionId?: string,
		guestSessionId?: string)
	{
		return post<IResponse>(apiKey, `tv/${seriesId}/rating`, {
			guest_session_id: guestSessionId,
			session_id      : sessionId
		}, { value });
	},

	/**
	 * Delete a rating for a TV show
	 */
	unrateSeries(apiKey: string, seriesId: number, sessionId?: string, guestSessionId?: string) {
		return del<IResponse>(apiKey, `tv/${seriesId}/rating`, {
			guest_session_id: guestSessionId,
			session_id      : sessionId
		});
	},

	/**
	 * Get the latest TV show
	 */
	getLatestSeries(apiKey: string, language?: string) {
		return get<ISeriesDetails>(apiKey, `tv/latest`, { language });
	},

	/**
	 * Get a list of TV shows airing today. Defaults to EST
	 */
	getShowsAiringToday(apiKey: string, page?: number, language?: string) {
		return get<ISeriesResults>(apiKey, `tv/airing_today`, { language, page });
	},

	/**
	 * Get a list of TV shows currently on the air
	 */
	getShowsOnAir(apiKey: string, page?: number, language?: string) {
		return get<ISeriesResults>(apiKey, `tv/on_the_air`, { language, page });
	},

	/**
	 * Get a list of popular TV shows on TMDb
	 */
	getPopularShows(apiKey: string, page?: number, language?: string) {
		return get<ISeriesResults>(apiKey, `tv/popular`, { language, page });
	},

	/**
	 * Get a list of top rated TV shows on TMDb
	 */
	getTopRatedShows(apiKey: string, page?: number, language?: string) {
		return get<ISeriesResults>(apiKey, `tv/top_rated`, { language, page });
	},

	// TV Seasons ----------------------------------------------------------------------------------

	/**
	 * Get the details of a TV show's season
	 */
	getSeasonDetails(apiKey: string, seriesId: number, season: number, language?: string) {
		return get<ISeasonDetails>(apiKey, `tv/${seriesId}/season/${season}`, { language });
	},

	/**
	 * Get the user ratings for a season's episodes
	 */
	getSeasonAccountStates(apiKey: string, seriesId: number, season: number, sessionId?: string,
		guestSessionId?: string, language?: string)
	{
		return get<ISeasonAccountStates>(apiKey,
			`tv/${seriesId}/season/${season}/account_states`, {
				guest_session_id: guestSessionId,
				session_id      : sessionId,
				language
			});
	},

	/**
	 * Get the aggregate credits for a TV show's season
	 */
	getSeasonAggregateCredits(apiKey: string, seriesId: number, season: number, language?: string)
	{
		return get<IAggregateCredits>(apiKey, `tv/${seriesId}/season/${season}/aggregate_credits`,
			{ language });
	},

	/**
	 * Get the credits for a TV show's season
	 */
	getSeasonCredits(apiKey: string, seriesId: number, season: number, language?: string) {
		return get<ICredits>(apiKey, `tv/${seriesId}/season/${season}/credits`, { language });
	},

	/**
	 * Get the list of external IDs for a TV show's season
	 */
	getSeasonExternalIds(apiKey: string, seriesId: number, season: number, language?: string) {
		return get<ISeasonExternalIds>(apiKey, `tv/${seriesId}/season/${season}/external_ids`,
			{ language });
	},

	/**
	 * Get a list of images for a TV show's season
	 */
	getSeasonImages(apiKey: string, seriesId: number, season: number, language?: string) {
		return get<ISeasonImages>(apiKey, `tv/${seriesId}/season/${season}/images`,
			{ language });
	},

	/**
	 * Get a list of translations for a TV show's season
	 */
	getSeasonTranslations(apiKey: string, seriesId: number, season: number, language?: string) {
		return get<ITranslations<ISeasonTranslation>>(apiKey,
			`tv/${seriesId}/season/${season}/translations`,
			{ language });
	},

	/**
	 * Get a list of videos for a TV show's season
	 */
	getSeasonVideos(apiKey: string, seriesId: number, season: number, language?: string) {
		return get<IVideos>(apiKey, `tv/${seriesId}/season/${season}/videos`, { language });
	},

	// TV Episodes ---------------------------------------------------------------------------------

	/**
	 * Get an episode's details
	 */
	getEpisodeDetails(apiKey: string, seriesId: number, season: number, episode: number,
		language?: string)
	{
		return get<IEpisodeDetails>(apiKey, `tv/${seriesId}/season/${season}/episode/${episode}`,
			{ language });
	},

	/**
	 * Get the account's rating for a TV show episode
	 */
	getEpisodeAccountState(apiKey: string, seriesId: number, season: number, episode: number,
		sessionId?: string, guestSessionId?: string, language?: string)
	{
		return get<IEpisodeAccountState>(apiKey,
			`tv/${seriesId}/season/${season}/episode/${episode}/account_states`, {
				guest_session_id: guestSessionId,
				session_id      : sessionId,
				language
			});
	},

	/**
	 * Get the credits for a TV show episode
	 */
	getEpisodeCredits(apiKey: string, seriesId: number, season: number, episode: number) {
		return get<IEpisodeCredits>(apiKey,
			`tv/${seriesId}/season/${season}/episode/${episode}/credits`);
	},

	/**
	 * Get the list of external IDs for a TV show episode
	 */
	getEpisodeExternalIds(apiKey: string, seriesId: number, season: number, episode: number) {
		return get<IEpisodeExternalIds>(apiKey,
			`tv/${seriesId}/season/${season}/episode/${episode}/external_ids`);
	},

	/**
	 * Get a list of images for a TV show episode
	 */
	getEpisodeImages(apiKey: string, seriesId: number, season: number, episode: number) {
		return get<IEpisodeImages>(apiKey,
			`tv/${seriesId}/season/${season}/episode/${episode}/images`);
	},

	/**
	 * Get the translation data for a TV show episode
	 */
	getEpisodeTranslations(apiKey: string, seriesId: number, season: number, episode: number) {
		return get<ITranslations<IEpisodeTranslation>>(apiKey,
			`tv/${seriesId}/season/${season}/episode/${episode}/translations`);
	},

	/**
	 * Rate a TV show episode
	 */
	rateEpisode(apiKey: string, seriesId: number, season: number, episode: number, value: number,
		sessionId?: string, guestSessionId?: string)
	{
		return post<IResponse>(apiKey,
			`tv/${seriesId}/season/${season}/episode/${episode}/rating`, {
				guest_session_id: guestSessionId,
				session_id      : sessionId
			}, { value });
	},

	/**
	 * Delete a rating for a TV show episode
	 */
	unrateEpisode(apiKey: string, seriesId: number, season: number, episode: number,
		sessionId?: string, guestSessionId?: string)
	{
		return del<IResponse>(apiKey,
			`tv/${seriesId}/season/${season}/episode/${episode}/rating`, {
				guest_session_id: guestSessionId,
				session_id      : sessionId
			});
	},

	/**
	 * Get a list of videos for a TV show episode
	 */
	getEpisodeVideos(apiKey: string, seriesId: number, season: number, episode: number,
		language?: string)
	{
		return get<IVideos>(apiKey,
			`tv/${seriesId}/season/${season}/episode/${episode}/videos`, { language });
	},

	// TV Episode Groups ---------------------------------------------------------------------------

	/**
	 * Get the details of a TV episode group
	 */
	getEpisodeGroupDetails(apiKey: string, groupId: string, language?: string) {
		return get<IEpisodeGroupDetails>(apiKey, `tv/episode_group/${groupId}`,
			{ language });
	}
};

