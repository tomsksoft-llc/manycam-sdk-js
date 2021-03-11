const commands = {
	request_for_access: "request_for_access",
	login: "login",
	logout: "logout",

	activate_subscription: "activate_subscription",
	deactivate_subscription: "deactivate_subscription",

	get_subscriptions: "get_subscriptions",
	get_available_webcams: "get_available_webcams",
	get_application_sources: "get_application_sources",
	get_ui_state: "get_ui_state",
	get_preset_state: "get_preset_state",
	get_video_resolutions: "get_video_resolutions",
	get_current_resolution: "get_current_resolution",
	get_current_preset: "get_current_preset",

	set_source: "set_source",

	edit_preset: "edit_preset",
	delete_preset: "delete_preset",
	make_preset_active: "make_preset_active",
	clear_preset: "clear_preset",

	edit_layer: "edit_layer",
	delete_layer: "delete_layer",

	exit_application: "exit_application",

	hide_or_show_ui: "hide_or_show_ui",
	set_flip: "set_flip",
	set_rotate: "set_rotate",
	set_transition_type: "set_transition_type",
	set_video_resolution: "set_video_resolution",

	set_game_launch: "set_game_launch",
	set_motion_detection: "set_motion_detection",
	set_motion_detection_switch: "set_motion_detection_switch",
	save_motion_detected_image: "save_motion_detected_image",
	save_image: "save_image",
	activate_playlist_item: "activate_playlist_item",
};

const commandTypes = {
	request: "request",
	get: "get",
	set: "set",
};
const events = {
	connected: "connected",
	command_failed: "command_failed",
	data_changed: "data_changed",
	opened: "opened",
	closed: "closed",
	error: "error",
};
const notifications = {
	notification: "notification",
	motion_detected: "motion_detected",
	subscription_state_changed: "subscription_state_changed",
	authorization_state_changed: "authorization_state_changed",
	presets_state_changed: "presets_state_changed",
};

const readyState = {
	connecting: 0,
	opened: 1,
	closing: 2,
	closed: 3,
	connected: 4,
};

/**
 * Colors
 * @property black  ![#000000](https://via.placeholder.com/15/000000/000000?text=+) BLACK color
 * @property maroon  ![#800000](https://via.placeholder.com/15/800000/000000?text=+) MAROON color
 * @property green  ![#008000](https://via.placeholder.com/15/008000/000000?text=+) GREEN color
 * @property olive  ![#808000](https://via.placeholder.com/15/808000/000000?text=+) OLIVE color
 * @property navy  ![#000080](https://via.placeholder.com/15/000080/000000?text=+) NAVY color
 * @property purple  ![#800080](https://via.placeholder.com/15/800080/000000?text=+) PURPLE color
 * @property teal  ![#008080](https://via.placeholder.com/15/008080/000000?text=+) TEAL color
 * @property grey  ![#808080](https://via.placeholder.com/15/808080/000000?text=+) GREY color
 * @property silver  ![#C0C0C0](https://via.placeholder.com/15/C0C0C0/000000?text=+) SILVER color
 * @property red  ![#FF0000](https://via.placeholder.com/15/FF0000/000000?text=+) RED color
 * @property lime  ![#00FF00](https://via.placeholder.com/15/00FF00/000000?text=+) LIME color
 * @property yellow  ![#FFFF00](https://via.placeholder.com/15/FFFF00/000000?text=+) YELLOW color
 * @property blue  ![#0000FF](https://via.placeholder.com/15/0000FF/000000?text=+) BLUE color
 * @property fuchsia  ![#FF00FF](https://via.placeholder.com/15/FF00FF/000000?text=+) FUCHSIA color
 * @property aqua  ![#00FFFF](https://via.placeholder.com/15/00FFFF/000000?text=+) AQUA color
 * @property white  ![#FFFFFF](https://via.placeholder.com/15/FFFFFF/000000?text=+) WHITE color
 */
const colors = {
	black: "black",
	maroon: "maroon",
	green: "green",
	olive: "olive",
	navy: "navy",
	purple: "purple",
	teal: "teal",
	grey: "grey",
	silver: "silver",
	red: "red",
	lime: "lime",
	yellow: "yellow",
	blue: "blue",
	fuchsia: "fuchsia",
	aqua: "aqua",
	white: "white",
};
/**
 * Types of sources
 * @property webcam Camera on your device
 * @property ipcam IP camera
 * @property mediafile Images & videos
 * @property desktop Desktop
 * @property youtube Youtube video
 * @property blank_image Color
 * @property game Game on your device
 * @property web Web page
 * @property rtmp_server RTMP server
 * @property mobile Mobile
 * @property ndi NDI
 */
const sources = {
	webcam: "webcam",
	ipcam: "ipcam",
	mediafile: "mediafile",
	desktop: "desktop",
	youtube: "youtube",
	blank_image: "blank_image",
	game: "game",
	web: "web",
	rtmp_server: "rtmp_server",
	mobile: "mobile",
	ndi: "ndi",
};
/**
 * Types of transitions
 * @property crossfade Crossfade
 * @property through_black Through black
 * @property through_white Through white
 * @property flow_horizontal Flow horizontal
 * @property flow_vertical Flow vertical
 * @property wipe_horizontal Wipe horizontal
 * @property wipe_vertical Wipe vertical
 * @property popup_top_left Popup from top left
 * @property popup_top_right Popup from top right
 * @property popup_bottom_left Popup from bottom left
 * @property popup_bottom_right Popup from bottom right
 * @property popup_center Popup center
 * @property split_out_horizontal Split out horizontal
 * @property split_out_vertical Split out vertical
 * @property split_in_horizontal Split in horizontal
 * @property split_in_vertical Split in vertical
 * @property random Random
 * @property cut Cut
 */
const transitionTypes = {
	crossfade: "crossfade",
	through_black: "through_black",
	through_white: "through_white",
	flow_horizontal: "flow_horizontal",
	flow_vertical: "flow_vertical",
	wipe_horizontal: "wipe_horizontal",
	wipe_vertical: "wipe_vertical",
	popup_top_left: "popup_top_left",
	popup_top_right: "popup_top_right",
	popup_bottom_left: "popup_bottom_left",
	popup_bottom_right: "popup_bottom_right",
	popup_center: "popup_center",
	split_out_horizontal: "split_out_horizontal",
	split_out_vertical: "split_out_vertical",
	split_in_horizontal: "split_in_horizontal",
	split_in_vertical: "split_in_vertical",
	random: "random",
	cut: "cut",
};
/**
 * Types of preset
 * @property free_pip Free arrangement of layers
 * @property vertically_splitted `Two` vertically splitted layers
 * @property horizontally_splitted `Two` horizontally splitted layers
 * @property cross_splitted `Four` cross splitted layers
 */
const presetTypes = {
	free_pip: "free_pip",
	vertically_splitted: "vertically_splitted",
	horizontally_splitted: "horizontally_splitted",
	cross_splitted: "cross_splitted",
};

module.exports = {
	colors,
	sources,
	transitionTypes,
	presetTypes,
	commands,
	commandTypes,
	events,
	notifications,
	readyState,
};
