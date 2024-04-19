// ==UserScript==
// @name         ConfigDashboard
// @namespace    http://tampermonkey.net/
// @version      2024-04-15
// @description  Render the Device Configuration settings in a readable format
// @author       Joe Pusateri
// @match        https://device-config.nauto.systems/edit-configs/*
// @match        https://device-config.staging-us.nauto.systems/edit-configs/*
// @require  https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/dist/js-yaml.js
// @require  http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_getResourceText
// ==/UserScript==

(function () {
  "use strict";
  var zNode = document.createElement("div");
  zNode.innerHTML = '<button id="myButton" type="button" hidden>Display Dashboard</button>';
  zNode.setAttribute("id", "myContainer");
  zNode.setAttribute("style", "text-align: center");

  document.getElementById("app").insertBefore(zNode, document.getElementById("app").firstChild);

  document.getElementById("myButton").addEventListener("click", ButtonClickAction, false);

  function ButtonClickAction(zEvent) {
    var zNode = document.getElementById("mergedreview_edit_config_result_wrap");
    if (zNode == null) {
      window.alert("Click on Merged");
    } else {
      popPage(zNode);
    }
  }

  function msToTime(ms) {
    let seconds = (ms / 1000).toFixed(3);
    let minutes = (ms / (1000 * 60)).toFixed(3);
    let hours = (ms / (1000 * 60 * 60)).toFixed(3);
    let days = (ms / (1000 * 60 * 60 * 24)).toFixed(3);
    if (seconds < 60) return (seconds == Math.trunc(seconds) ? Math.trunc(seconds) : seconds) + " s";
    else if (minutes < 60) return (minutes == Math.trunc(minutes) ? Math.trunc(minutes) : minutes) + " min";
    else if (hours < 24) return (hours == Math.trunc(hours) ? Math.trunc(hours) : hours) + " hr";
    else return (days == Math.trunc(days) ? Math.trunc(days) : days) + " days"
  }

  function popPage(jNode) {
    var yraw = jNode.childNodes[1].childNodes[0].textContent;
    var win = window.open("", "displayconfig", "popup");
    var n3 = jsyaml.load(yraw).n3["configuration-settings"];
    win.document.body.innerHTML = getPage(n3);
    return false;
  }

  const defs = JSON.parse(
    '{"AbccLedBlinker_blink_at_night": false, "AbccModule_back_up_plays_policy_violation_iva": false, "AlgorithmStateService_enabled": false, "AlgorithmStateService_low_power_speed_limit_miph": 5.0, "AncillaryCameraModule_bitrate": 1000000, "AncillaryCameraModule_enabled": false, "AncillaryCameraModule_video_height_px": 1080, "AncillaryCameraModule_video_width_px": 1920, "AtypicalDetectors_enabled": true, "AtypicalDetectors_misoriented_enable_debug_audio": true, "AtypicalDetectors_misoriented_enabled": true, "AtypicalDetectors_misoriented_media_lockout_ms": -1, "AtypicalDetectors_misoriented_media_profile": "SENSOR_ONLY", "AtypicalDetectors_misoriented_upload_media_when_atypical": false, "AutoCalibration_bottom_percentile": 95, "AutoCalibration_calculator_buffer_capacity": 500, "AutoCalibration_crop_similarity_margin_px": 10, "AutoCalibration_enable_extend_triangle": true, "AutoCalibration_enabled": true, "AutoCalibration_left_percentile": 50, "AutoCalibration_lowest_boxes_percentile": 10, "AutoCalibration_max_sample_count": 50, "AutoCalibration_max_sample_period_s": 21600, "AutoCalibration_min_sample_count": 40, "AutoCalibration_picker_max_empty_frame_count": 6, "AutoCalibration_picker_min_frame_buffer_size": 6, "AutoCalibration_right_percentile": 50, "AutoCalibration_sample_interval_s": 30, "AutoCalibration_top_percentile": 80, "AutoCalibration_update_interval_s": 28800, "BeaconService_beacon_uuid": "f7826da64fa24e988024bc5b71e0893e", "BeaconService_enable_beacon": false, "CameraSchedulerModule_cabture_snapshot_enabled": false, "CameraSchedulerModule_cabture_snapshot_period": 180000, "CameraSchedulerModule_cabture_snapshot_quality": 40, "CameraSchedulerModule_cabture_snapshot_width": 640, "CameraSchedulerModule_delay_for_nautort_encoder_close_ms": 0, "CameraSchedulerModule_distraction_interval": 250, "CameraSchedulerModule_driver_id_crop_image_normalized_coords_xmax": 0.6, "CameraSchedulerModule_driver_id_crop_image_normalized_coords_xmin": 0.05, "CameraSchedulerModule_driver_id_crop_image_normalized_coords_ymax": 0.85, "CameraSchedulerModule_driver_id_crop_image_normalized_coords_ymin": 0.05, "CameraSchedulerModule_driver_id_max_upload_count": 3, "CameraSchedulerModule_driver_id_roi_snapshot_quality": 70, "CameraSchedulerModule_driver_id_roi_snapshot_width": 704, "CameraSchedulerModule_driver_id_snapshot_enabled": true, "CameraSchedulerModule_driver_id_snapshot_interval": 10000, "CameraSchedulerModule_driver_id_snapshot_look_for_face_ms": 120000, "CameraSchedulerModule_driver_id_snapshot_no_driver_interval": 60000, "CameraSchedulerModule_driver_id_snapshot_quality": 70, "CameraSchedulerModule_driver_id_snapshot_timeout_ms": 30000, "CameraSchedulerModule_driver_id_snapshot_width": 250, "CameraSchedulerModule_driver_id_upload_only_on_parked": false, "CameraSchedulerModule_driver_id_upload_sensor_file_for_snapshot": false, "CameraSchedulerModule_driver_id_version": 2, "CameraSchedulerModule_driver_id_warmup_snapshot_count": 10, "CameraSchedulerModule_driver_id_warmup_snapshot_interval_ms": 60000, "CameraSchedulerModule_enable_corrupted_video_fixer_loop": false, "CameraSchedulerModule_enable_video_data_db": true, "CameraSchedulerModule_event_snapshot_in_quality": 40, "CameraSchedulerModule_event_snapshot_in_width": 640, "CameraSchedulerModule_event_snapshot_out_quality": 40, "CameraSchedulerModule_event_snapshot_out_width": 640, "CameraSchedulerModule_exterior_camera_snapshot_enabled": false, "CameraSchedulerModule_exterior_camera_snapshot_period": 10000, "CameraSchedulerModule_external_camera_ae_rect": "0.25,0.4167,0.75,0.75", "CameraSchedulerModule_external_region_based_ae_enabled": true, "CameraSchedulerModule_external_video_bitrate": 0, "CameraSchedulerModule_external_video_dimensions": "", "CameraSchedulerModule_external_video_frame_rate": 0, "CameraSchedulerModule_extracted_video_chunk_length": 5000, "CameraSchedulerModule_face_detection_enabled": true, "CameraSchedulerModule_frame_buffer_size": 300, "CameraSchedulerModule_installer_mode_fleet_id": "x-manufacturing", "CameraSchedulerModule_installer_mode_snapshot_period": 2500, "CameraSchedulerModule_installer_snapshot_quality": 60, "CameraSchedulerModule_installer_snapshot_width": 853, "CameraSchedulerModule_interior_camera_snapshot_enabled": true, "CameraSchedulerModule_interior_camera_snapshot_period": 30000, "CameraSchedulerModule_interior_camera_snapshot_sequence_length": 15, "CameraSchedulerModule_interior_camera_snapshot_timeout": 3600000, "CameraSchedulerModule_internal_audio_enabled": false, "CameraSchedulerModule_internal_camera_ae_rect": "0,0,0.5,1", "CameraSchedulerModule_internal_camera_monochrome_mode_enabled": true, "CameraSchedulerModule_internal_min_free_space_multiplier": 2, "CameraSchedulerModule_internal_region_based_ae_enabled": false, "CameraSchedulerModule_internal_video_bitrate": 0, "CameraSchedulerModule_internal_video_dimensions": "", "CameraSchedulerModule_internal_video_frame_rate": 0, "CameraSchedulerModule_keep_camera_session_on_cutoff": true, "CameraSchedulerModule_max_errors_in_recent": 5, "CameraSchedulerModule_max_size_for_extracted_video_in_gb": 2.0, "CameraSchedulerModule_max_size_for_mjpeg_in_gb": 2.0, "CameraSchedulerModule_max_size_for_snapshot_in_gb": 0.2, "CameraSchedulerModule_max_snap_sub_folder_count": 7, "CameraSchedulerModule_max_time_as_recent": 90000, "CameraSchedulerModule_max_video_cutoff_delay": 300000, "CameraSchedulerModule_min_extracted_length_after_event": 2000, "CameraSchedulerModule_min_extracted_length_before_event": 4000, "CameraSchedulerModule_min_free_space_to_keep_in_gb": 2.0, "CameraSchedulerModule_min_interval_research_collision": 120000, "CameraSchedulerModule_min_interval_research_distraction": 120000, "CameraSchedulerModule_min_interval_research_tailgating": 120000, "CameraSchedulerModule_no_cutoff_on_event": false, "CameraSchedulerModule_percentage_to_free": 0.05, "CameraSchedulerModule_research_collision_mjpeg_quality": 100, "CameraSchedulerModule_research_distraction_mjpeg_quality": 100, "CameraSchedulerModule_research_tailgating_mjpeg_quality": 100, "CameraSchedulerModule_right_hand_drive": false, "CameraSchedulerModule_roadture_snapshot_enabled": false, "CameraSchedulerModule_roadture_snapshot_period": 180000, "CameraSchedulerModule_roadture_snapshot_quality": 40, "CameraSchedulerModule_roadture_snapshot_roi": "", "CameraSchedulerModule_roadture_snapshot_width": 640, "CameraSchedulerModule_send_video_cutoff_msg_enabled": true, "CameraSchedulerModule_tailgating_interval": 83, "CameraSchedulerModule_target_free_space_in_gb": 3.0, "CameraSchedulerModule_use_new_seek_method_in_extraction": false, "CameraSchedulerModule_use_video_start_time_from_callback": false, "CameraSchedulerModule_video_bitrate": 1000000, "CameraSchedulerModule_video_cutoff_buffer": 5000, "CameraSchedulerModule_video_dimensions": "864,480", "CameraSchedulerModule_video_frame_rate": 15, "CameraSchedulerModule_video_length_ms": 300000, "CellPhoneDetector2_duration_threshold_ms": 5000, "CellPhoneDetector2_enable": true, "CellPhoneDetector2_high_risk_enable_debug_audio": true, "CellPhoneDetector2_high_risk_media_lockout_ms": 600000, "CellPhoneDetector2_high_risk_media_profile": "SNAPSHOTS", "CellPhoneDetector2_high_risk_upload_media_when_atypical": true, "CellPhoneDetector2_score_threshold": 0.7, "CellularUploadCap_backend_triggered": false, "CellularUploadCap_billing_cycle_upload_cap_threshold_mb": 3072, "CellularUploadCap_enabled": false, "CloudCommunicationModule_config_connection_timeout": 30000, "CloudCommunicationModule_config_read_timeout": 30000, "CloudCommunicationModule_config_write_timeout": 30000, "CloudCommunicationModule_enable_protobuf_messages": false, "CloudCommunicationModule_fill_s2CellID": true, "CloudCommunicationModule_http_logs_severity": "BASIC", "CloudCommunicationModule_register_suppress_settings": true, "CloudCommunicationModule_use_config_endpoint": true, "ComboEventService_after_second_event_padding_time_s": 2.0, "ComboEventService_before_first_event_padding_time_s": 2.0, "ComboEventService_enabled": false, "ComboEventService_no_media_enable_debug_audio": false, "ComboEventService_no_media_media_lockout_ms": -1, "ComboEventService_no_media_media_profile": "NO_MEDIA", "ComboEventService_no_media_upload_media_when_atypical": false, "ComboEventService_output_enable_debug_audio": false, "ComboEventService_output_media_lockout_ms": -1, "ComboEventService_output_media_profile": "NO_MEDIA", "ComboEventService_output_upload_media_when_atypical": false, "ComboEventService_sensor_only_enable_debug_audio": false, "ComboEventService_sensor_only_media_lockout_ms": -1, "ComboEventService_sensor_only_media_profile": "SENSOR_ONLY", "ComboEventService_sensor_only_upload_media_when_atypical": false, "ComboEventService_snapshot_single_enable_debug_audio": false, "ComboEventService_snapshot_single_media_lockout_ms": -1, "ComboEventService_snapshot_single_media_profile": "SNAPSHOT_SINGLE", "ComboEventService_snapshot_single_upload_media_when_atypical": false, "ComboEventService_snapshots_enable_debug_audio": false, "ComboEventService_snapshots_long_enable_debug_audio": false, "ComboEventService_snapshots_long_media_lockout_ms": -1, "ComboEventService_snapshots_long_media_profile": "SNAPSHOTS_LONG", "ComboEventService_snapshots_long_upload_media_when_atypical": false, "ComboEventService_snapshots_media_lockout_ms": -1, "ComboEventService_snapshots_media_profile": "SNAPSHOTS", "ComboEventService_snapshots_upload_media_when_atypical": false, "ComboEventService_video_long_enable_debug_audio": false, "ComboEventService_video_long_media_lockout_ms": -1, "ComboEventService_video_long_media_profile": "VIDEO_LONG", "ComboEventService_video_long_upload_media_when_atypical": false, "ComboEventService_video_medium_enable_debug_audio": false, "ComboEventService_video_medium_media_lockout_ms": -1, "ComboEventService_video_medium_media_profile": "VIDEO_MEDIUM", "ComboEventService_video_medium_upload_media_when_atypical": false, "ComboEventService_video_short_enable_debug_audio": false, "ComboEventService_video_short_media_lockout_ms": -1, "ComboEventService_video_short_media_profile": "VIDEO_SHORT", "ComboEventService_video_short_upload_media_when_atypical": false, "ConfigApp_use_clients_validators": true, "ConnectivityMonitor_send_connectivity_state_message": false, "CrashnetModule_accel_batch_interval_ms": 0, "CrashnetModule_accel_sampling_interval_ms": 5, "CrashnetModule_act_peak_strategy": 0, "CrashnetModule_always_collision_accel_threshold_mps2": 19.6, "CrashnetModule_bump_dip_threshold": 0.5, "CrashnetModule_collision_enable_debug_audio": true, "CrashnetModule_collision_media_lockout_ms": -1, "CrashnetModule_collision_media_profile": "CRASHNET", "CrashnetModule_collision_threshold": 0.2, "CrashnetModule_collision_upload_media_when_atypical": false, "CrashnetModule_compatible_driver_behaviour_model_version": "69", "CrashnetModule_curb_strike_threshold": 0.5, "CrashnetModule_curb_strike_video_probability": 0.0, "CrashnetModule_default_model_version": 5, "CrashnetModule_door_slam_threshold": 0.5, "CrashnetModule_execution_runtime": "CPU", "CrashnetModule_filter_via_loose_heuristic": true, "CrashnetModule_fusion_crashnet_other_labels_event_duration_ms": 20000, "CrashnetModule_gyro_batch_interval_ms": 0, "CrashnetModule_gyro_sampling_interval_ms": 5, "CrashnetModule_hard_brake_threshold": 0.5, "CrashnetModule_hard_brake_video_probability": 0.0, "CrashnetModule_loose_device_threshold": 0.9, "CrashnetModule_loose_device_video_probability": 0.0, "CrashnetModule_lower_g_peak_strategy": 0, "CrashnetModule_min_look_back_reserve_time_s": 20.0, "CrashnetModule_minimum_compatible_fusion_crashnet_model_version": "100", "CrashnetModule_module_on": true, "CrashnetModule_non_collision_enable_debug_audio": true, "CrashnetModule_non_collision_media_lockout_ms": -1, "CrashnetModule_non_collision_media_profile": "NO_MEDIA", "CrashnetModule_non_collision_upload_media_when_atypical": false, "CrashnetModule_non_collisions_video_probability": 0.0, "CrashnetModule_other_labels_enable_debug_audio": true, "CrashnetModule_other_labels_media_lockout_ms": -1, "CrashnetModule_other_labels_media_profile": "NO_MEDIA", "CrashnetModule_other_labels_upload_media_when_atypical": false, "CrashnetModule_safety_incident_enable_debug_audio": true, "CrashnetModule_safety_incident_event_duration_ms": 20000, "CrashnetModule_safety_incident_media_lockout_ms": -1, "CrashnetModule_safety_incident_media_profile": "SAFETY_INCIDENT", "CrashnetModule_safety_incident_threshold": 0.07, "CrashnetModule_safety_incident_upload_media_when_atypical": false, "CrashnetModule_snpe_output_layer_list": "collision_loose_device_output", "CrashnetModule_tf_default_model_version": 15, "CrashnetModule_triggers": 3, "CrashnetModule_uneven_road_threshold": 0.5, "CrashnetModule_uneven_road_video_probability": 0.0, "CrashnetModule_uploads_sensor_files_for_non_collisions": true, "CrashnetModule_uploads_videos": false, "CrashnetModule_uploads_videos_for_non_collisions": false, "CrashnetModule_video_seconds_after": 2, "CrashnetModule_video_seconds_before": 2, "CrashnetShadowModule_act_peak_strategy": 0, "CrashnetShadowModule_always_collision_accel_threshold_mps2": 19.6, "CrashnetShadowModule_bump_dip_threshold": 0.5, "CrashnetShadowModule_collision_enable_debug_audio": true, "CrashnetShadowModule_collision_media_lockout_ms": -1, "CrashnetShadowModule_collision_media_profile": "CRASHNET", "CrashnetShadowModule_collision_threshold": 0.2, "CrashnetShadowModule_collision_upload_media_when_atypical": false, "CrashnetShadowModule_compatible_driver_behaviour_model_version": "69", "CrashnetShadowModule_curb_strike_threshold": 0.5, "CrashnetShadowModule_door_slam_threshold": 0.5, "CrashnetShadowModule_enabled": false, "CrashnetShadowModule_execution_runtime": "CPU", "CrashnetShadowModule_filter_via_loose_heuristic": false, "CrashnetShadowModule_fusion_crashnet_other_labels_event_duration_ms": 20000, "CrashnetShadowModule_hard_brake_threshold": 0.5, "CrashnetShadowModule_loose_device_threshold": 0.9, "CrashnetShadowModule_loose_device_video_probability": 0.0, "CrashnetShadowModule_lower_g_peak_strategy": 0, "CrashnetShadowModule_min_look_back_reserve_time_s": 20.0, "CrashnetShadowModule_minimum_compatible_fusion_crashnet_model_version": "100", "CrashnetShadowModule_non_collision_enable_debug_audio": true, "CrashnetShadowModule_non_collision_media_lockout_ms": -1, "CrashnetShadowModule_non_collision_media_profile": "NO_MEDIA", "CrashnetShadowModule_non_collision_upload_media_when_atypical": false, "CrashnetShadowModule_non_collisions_video_probability": 0.0, "CrashnetShadowModule_other_labels_enable_debug_audio": true, "CrashnetShadowModule_other_labels_media_lockout_ms": -1, "CrashnetShadowModule_other_labels_media_profile": "NO_MEDIA", "CrashnetShadowModule_other_labels_upload_media_when_atypical": false, "CrashnetShadowModule_safety_incident_enable_debug_audio": true, "CrashnetShadowModule_safety_incident_event_duration_ms": 20000, "CrashnetShadowModule_safety_incident_media_lockout_ms": -1, "CrashnetShadowModule_safety_incident_media_profile": "SAFETY_INCIDENT", "CrashnetShadowModule_safety_incident_threshold": 0.07, "CrashnetShadowModule_safety_incident_upload_media_when_atypical": false, "CrashnetShadowModule_snpe_output_layer_list": "", "CrashnetShadowModule_triggers": 3, "CrashnetShadowModule_uneven_road_threshold": 0.5, "CrashnetShadowModule_uploads_sensor_files_for_non_collisions": true, "CrashnetShadowModule_uploads_videos": false, "CrashnetShadowModule_uploads_videos_for_non_collisions": false, "CrashnetShadowModule_video_seconds_after": 2, "CrashnetShadowModule_video_seconds_before": 2, "DeviceStateService_enabled": false, "DeviceStateService_loose_device_enabled": false, "Dhm_Auto_power_up_check_interval_ms": 10000, "Dhm_Auto_power_up_time_ms": 200000, "Dhm_Logging_monitor_buffer_s": 2, "Dhm_WakelockDuration_ms": 300000, "Dhm_WakeupInterval_ms": 720000, "Diagnostics_enable_accelerometer": true, "Diagnostics_enable_apn": false, "Diagnostics_enable_automatic_time": true, "Diagnostics_enable_automatic_timezone": true, "Diagnostics_enable_bluetooth": true, "Diagnostics_enable_bluetooth_ble": true, "Diagnostics_enable_devcfg": false, "Diagnostics_enable_exterior_camera": true, "Diagnostics_enable_external_storage": false, "Diagnostics_enable_external_storage_space": false, "Diagnostics_enable_game_rotation_vector": true, "Diagnostics_enable_gps": false, "Diagnostics_enable_imei": false, "Diagnostics_enable_interior_camera": true, "Diagnostics_enable_internal_storage": true, "Diagnostics_enable_internal_storage_space": true, "Diagnostics_enable_linear_accelerometer": false, "Diagnostics_enable_nauto_api_manager": true, "Diagnostics_enable_rotation_vector": false, "Diagnostics_enable_sim": false, "Diagnostics_enable_wifi": true, "Diagnostics_external_storage_Space_threshold": 0.995, "Diagnostics_internal_storage_Space_threshold": 0.99, "Diagnostics_run_on_startup": true, "Diagnostics_valid_apns": "m2m005200.attz.,nauto.m2m,sub.docomoiot.net", "DiscoveryServiceEndpoint_connection_timeout": 30000, "DiscoveryServiceEndpoint_dev_url": "https://discovery.staging-us.nauto.systems/v1/", "DiscoveryServiceEndpoint_production_url": "https://discovery.nauto.systems/v1/", "DiscoveryServiceEndpoint_read_timeout": 30000, "DiscoveryServiceEndpoint_write_timeout": 30000, "DistractionData_upload_video": false, "DistractionGlobal_aware_interval_before_confirm_ms": 1000, "DistractionGlobal_confidence_threshold": 0.9, "DistractionGlobal_degradation_threshold": 1.0, "DistractionGlobal_detector_state_machine_version": 2, "DistractionGlobal_enable": true, "DistractionGlobal_enable_vehicle_turning_check_messages": false, "DistractionGlobal_frame_interval_ms": 130, "DistractionGlobal_high_speed_location_tolerance_ms": 2000, "DistractionGlobal_low_speed_location_tolerance_ms": 5000, "DistractionGlobal_max_event_duration_ms": 250000, "DistractionGlobal_minimum_speed_miph": 5.0, "DistractionGlobal_necessary_aware_interval_ms": 500, "DistractionGlobal_performance_ratio_filter_window_length": 5, "DistractionGlobal_use_confidence_threshold": false, "DownstreamHandlingModule_custom_video_sensor_after": 30000, "DownstreamHandlingModule_custom_video_sensor_before": 60000, "DownstreamHandlingModule_queue_depth": 200, "DownstreamHandlingModule_short_poll_delay": 300000, "DownstreamHandlingModule_use_cloudcomm_for_downstream_commands": true, "DriverBehaviourService_crop_rect_height_px": 720, "DriverBehaviourService_crop_rect_left_side_px": 512, "DriverBehaviourService_crop_rect_top_side_px": 0, "DriverBehaviourService_crop_rect_width_px": 768, "DriverBehaviourService_degradation_threshold": 1.0, "DriverBehaviourService_driver_behaviour_runtime": "DSP", "DriverBehaviourService_enable": true, "DriverBehaviourService_frame_interval_ms": 130, "DriverBehaviourService_high_speed_location_tolerance_ms": 2000, "DriverBehaviourService_low_speed_location_tolerance_ms": 5000, "DriverBehaviourService_minimum_reference_samples": 10, "DriverBehaviourService_minimum_speed_miph": 5.0, "DriverBehaviourService_prediction_percentile": 0.5, "DriverBehaviourService_reference_interval_ms": 2000, "DriverBehaviourService_reference_samples": 60, "DriverBehaviourService_skip_processing_checks": false, "DriverBehaviourService_use_differential_algorithm": false, "DriverDistractionModule_default_version": 12, "DriverDistractionModule_default_version_night": 8, "DriverDistractionModule_level_one_alert_minimum": 2500, "DriverDistractionModule_level_three_alert_minimum": 5500, "DriverDistractionModule_level_two_alert_minimum": 4000, "DriverDistractionModule_minimum_day_version": 5, "DriverDistractionModule_minimum_night_version": 4, "DriverDistractionModule_play_real_time_alerts": false, "DriverDistractionModule_play_real_time_alerts_night": false, "DriverDistractionModule_real_time_alert_lockout": 5000, "DrowsinessService_compatible_distraction_model_version": "67", "DrowsinessService_default_version": 1, "DrowsinessService_embeddings_size": 1280, "DrowsinessService_enable": true, "DrowsinessService_enable_research_mode": false, "DrowsinessService_frame_buffer_duration_s": 30, "DrowsinessService_minimum_compatible_drowsiness_model_version": "4", "DrowsinessService_model_run_interval_ms": 1000, "DrowsinessService_output_enable_debug_audio": true, "DrowsinessService_output_media_lockout_ms": -1, "DrowsinessService_output_media_profile": "VIDEO_MEDIUM", "DrowsinessService_output_upload_media_when_atypical": true, "DrowsinessService_research_output_enable_debug_audio": true, "DrowsinessService_research_output_media_lockout_ms": -1, "DrowsinessService_research_output_media_profile": "VIDEO_MEDIUM", "DrowsinessService_research_output_upload_media_when_atypical": true, "DrowsinessService_research_score_threshold": 0.8, "DrowsinessService_runtime": "GPU", "DrowsinessService_score_threshold": 0.68, "EventAudioService_accel_hard_group_event_min_play_level": 1, "EventAudioService_accel_normal_group_event_min_play_level": 1, "EventAudioService_accel_severe_group_event_min_play_level": 1, "EventAudioService_camera_group_event_min_play_level": 1, "EventAudioService_gps_signal_group_event_min_play_level": 1, "EventAudioService_level_one_distraction_name": "distraction_alert_level_one", "EventAudioService_level_one_tailgating_name": "tailgating_alert_level_one", "EventAudioService_level_three_distraction_name": "distraction_alert_level_three", "EventAudioService_level_three_tailgating_name": "tailgating_alert_level_three", "EventAudioService_level_two_distraction_name": "distraction_alert_level_two", "EventAudioService_level_two_tailgating_name": "tailgating_alert_level_two", "EventAudioService_mark_event_audio_enabled": true, "EventAudioService_min_alert_level": 3, "EventAudioService_vehicle_state_group_event_min_play_level": 1, "ExecutorManager_enable_runnable_instrumentation": true, "ExecutorManager_enable_runnable_instrumentation_send_messages": true, "ExecutorManager_num_workers_in_thread_pool": 40, "ExecutorManager_runnable_instrumentation_runtime_threshold_ms": 20000, "ExecutorManager_runnable_instrumentation_send_message_batch_size": 5, "ExecutorManager_runnable_instrumentation_send_message_min_interval_s": 60, "ExecutorManager_runnable_instrumentation_submit_to_execute_threshold_ms": 10000, "ExecutorManager_submit_sequential_queue_micro_wait_ms": 100, "ExecutorManager_submit_sequential_queue_wait_ms": 500, "EyesClosedDetector2_duration_threshold_ms": 2000, "EyesClosedDetector2_enable": true, "EyesClosedDetector2_high_risk_enable_debug_audio": true, "EyesClosedDetector2_high_risk_media_lockout_ms": 7200000, "EyesClosedDetector2_high_risk_media_profile": "SNAPSHOTS", "EyesClosedDetector2_high_risk_upload_media_when_atypical": true, "EyesClosedDetector2_needs_continuous_distracted_frames": false, "EyesClosedDetector2_score_threshold": 0.75, "EyesClosedDetector2_severe_distraction_time_ms": 2000, "EyesClosedDetector2_severe_risk_enable_debug_audio": true, "EyesClosedDetector2_severe_risk_media_lockout_ms": 7200000, "EyesClosedDetector2_severe_risk_media_profile": "VIDEO_LONG", "EyesClosedDetector2_severe_risk_upload_media_when_atypical": true, "FcwService_apply_smoothing": false, "FcwService_box_bottom_increase_margin_px": 2, "FcwService_conseq_frame_num": 3, "FcwService_degradation_threshold": 4.0, "FcwService_enable": false, "FcwService_estimation_fps": 6, "FcwService_estimation_how_many_last_frames": 3, "FcwService_estimation_kappa": 2250.0, "FcwService_estimation_min_inter_threshold": 0.3, "FcwService_estimation_velocity_margin": 1.0, "FcwService_event_duration_ms": 2000, "FcwService_leading_vehicle_algorithm_version": "TRIANGLE", "FcwService_min_box_width": 30, "FcwService_output_enable_debug_audio": true, "FcwService_output_media_lockout_ms": -1, "FcwService_output_media_profile": "NO_MEDIA", "FcwService_output_upload_media_when_atypical": true, "FcwService_ttc_thresh_s": 1.75, "FcwService_vehicle_front_end_offset_m": 1.8, "FcwService_version": "SCALE", "FileUploaderModule_enable_video_repair_before_upload": false, "Gps_debug_led": false, "Gps_default_latitude": 0.0, "Gps_default_longitude": 0.0, "Gps_enable_audio_prompts": false, "Gps_max_no_start_to_reset": 0, "Gps_observers_update_interval_ms": 1000, "HardwareMarkButtonModule_connection_mode": 0, "HardwareMarkButtonModule_enabled": true, "HardwareMarkButtonModule_min_mark_video_after_event": 10000, "HardwareMarkButtonModule_min_mark_video_before_event": 20000, "HardwareMarkButtonModule_min_panic_video_after_event": 40000, "HardwareMarkButtonModule_min_panic_video_before_event": 20000, "HardwareMarkButtonModule_rssi_threshold": -70, "HealthStatusMonitor_max_age_ms": 60000, "HealthStatusMonitor_sample_rate_acceptable_ratio": 0.5, "HoldingObjectDetector2_duration_threshold_ms": 10000, "HoldingObjectDetector2_enable": true, "HoldingObjectDetector2_high_risk_enable_debug_audio": true, "HoldingObjectDetector2_high_risk_media_lockout_ms": 600000, "HoldingObjectDetector2_high_risk_media_profile": "NO_MEDIA", "HoldingObjectDetector2_high_risk_upload_media_when_atypical": true, "HoldingObjectDetector2_score_threshold": 0.7, "IgnitionStateModule_battery_type_threshold_v": 16.0, "IgnitionStateModule_enabled": false, "IgnitionStateModule_ignition_off_consecutive_count": 5, "IgnitionStateModule_ignition_off_threshold_for_12v_battery_v": 12.6, "IgnitionStateModule_ignition_off_threshold_for_24v_battery_v": 25.2, "IgnitionStateModule_ignition_on_threshold_for_12v_battery_v": 13.0, "IgnitionStateModule_ignition_on_threshold_for_24v_battery_v": 26.8, "IgnitionStateModule_max_sample_age_s": 30, "InstallationBox_connection_timeout_ms": 3600000, "InstallationBox_enabled": false, "InstallationBox_snapshot_period_ms": 3600000, "InwardCameraService_ae_antibanding_mode": 3, "InwardCameraService_audio_enabled": false, "InwardCameraService_bitrate": 1000000, "InwardCameraService_core_app_managed": true, "InwardCameraService_delay_for_nautort_inward_camera_ms": 200, "InwardCameraService_enabled": true, "InwardCameraService_enabled_noise_reduction": true, "InwardCameraService_encoder_image_height_px": 480, "InwardCameraService_encoder_image_width_px": 854, "InwardCameraService_face_info_batch_size": 15, "InwardCameraService_fps": 15, "InwardCameraService_image_height_px": 720, "InwardCameraService_image_width_px": 1280, "InwardCameraService_luminance_info_batch_size": 15, "InwardCameraService_max_muxer_duration_s": 30, "InwardCameraService_number_of_camera_buffers": 150, "InwardCameraService_number_of_errors_before_restart": 5, "InwardCameraService_number_of_restarts_before_reboot": 2, "InwardCameraService_snapshot_drumbuffer_length_s": 10, "InwardCameraService_snapshot_enabled": true, "InwardCameraService_snapshot_expiration_interval_s": 30, "InwardCameraService_snapshot_image_height_px": 480, "InwardCameraService_snapshot_image_width_px": 854, "InwardCameraService_snapshot_trigger_expiration_interval_ms": 800, "InwardCameraService_snapshotservice_copy_frame": false, "InwardCameraService_video_codec": 0, "InwardCameraService_video_encoder_enabled": true, "InwardCameraService_video_length_sec": 300, "JsonSenderDirect_message_pb_trim_amount": 10, "JsonSenderDirect_message_trim_amount": 10, "JsonSenderDirect_mobile_data_quiet_duration": 120000, "JsonSenderDirect_upload_trim_amount": 5, "KernelWatchdog_enable": true, "KernelWatchdog_interval_multiplier": 2, "LedAlerts_panic_alert_day_mode_enabled": true, "LedAlerts_panic_alert_night_mode_enabled": true, "LedAlerts_panic_alerts_enabled": true, "LightSensorModule_day_to_night_light_threshold": 58, "LightSensorModule_enabled": false, "LightSensorModule_ir_led_level": 160, "LightSensorModule_minimum_duration_of_contrary_light_level": 2000, "LightSensorModule_minimum_night_mode_change_interval": 1800000, "LightSensorModule_night_detection_algorithm": 2, "LightSensorModule_night_to_day_light_threshold": 78, "LoadBalancingService_enabled": false, "LoadBalancingService_power_consumption_averaging_period_ms": 10000, "LoadBalancingService_power_consumption_threshold_high_mW": 7500.0, "LoadBalancingService_power_consumption_threshold_low_mW": 6600.0, "LoadBalancingService_power_consumption_threshold_very_high_mW": 8000.0, "LoadBalancingService_power_consumption_threshold_very_low_mW": 6000.0, "LoadBalancingService_services_ordering": "", "LoadBalancingService_temperature_averaging_period_ms": 10000, "LoadBalancingService_temperature_threshold_high_C": 60.0, "LoadBalancingService_temperature_threshold_low_C": 40.0, "LookingDownDetector2_alerts_enabled": true, "LookingDownDetector2_duration_threshold_ms": 2000, "LookingDownDetector2_enable": true, "LookingDownDetector2_high_risk_enable_debug_audio": true, "LookingDownDetector2_high_risk_media_lockout_ms": 0, "LookingDownDetector2_high_risk_media_profile": "SNAPSHOTS", "LookingDownDetector2_high_risk_upload_media_when_atypical": true, "LookingDownDetector2_score_threshold": 0.85, "LookingDownDetector2_severe_duration_threshold_ms": 4000, "LookingDownDetector2_severe_risk_enable_debug_audio": true, "LookingDownDetector2_severe_risk_media_lockout_ms": 0, "LookingDownDetector2_severe_risk_media_profile": "VIDEO_SHORT", "LookingDownDetector2_severe_risk_upload_media_when_atypical": true, "LookingDriverSideDetector2_duration_threshold_ms": 3000, "LookingDriverSideDetector2_enable": false, "LookingDriverSideDetector2_enable_minimum_speed_limit": false, "LookingDriverSideDetector2_enable_vehicle_turning_check": false, "LookingDriverSideDetector2_high_risk_enable_debug_audio": true, "LookingDriverSideDetector2_high_risk_media_lockout_ms": 300000, "LookingDriverSideDetector2_high_risk_media_profile": "NO_MEDIA", "LookingDriverSideDetector2_high_risk_upload_media_when_atypical": true, "LookingDriverSideDetector2_maximum_turn_radius_m": 50.0, "LookingDriverSideDetector2_minimum_speed_miph": 30.0, "LookingDriverSideDetector2_score_threshold": 0.7, "LookingPassengerSideDetector2_duration_threshold_ms": 3000, "LookingPassengerSideDetector2_enable": false, "LookingPassengerSideDetector2_enable_minimum_speed_limit": false, "LookingPassengerSideDetector2_enable_vehicle_turning_check": false, "LookingPassengerSideDetector2_high_risk_enable_debug_audio": true, "LookingPassengerSideDetector2_high_risk_media_lockout_ms": 300000, "LookingPassengerSideDetector2_high_risk_media_profile": "NO_MEDIA", "LookingPassengerSideDetector2_high_risk_upload_media_when_atypical": true, "LookingPassengerSideDetector2_maximum_turn_radius_m": 50.0, "LookingPassengerSideDetector2_minimum_speed_miph": 30.0, "LookingPassengerSideDetector2_score_threshold": 0.7, "LookingUpDetector2_duration_threshold_ms": 3000, "LookingUpDetector2_enable": false, "LookingUpDetector2_high_risk_enable_debug_audio": true, "LookingUpDetector2_high_risk_media_lockout_ms": 300000, "LookingUpDetector2_high_risk_media_profile": "NO_MEDIA", "LookingUpDetector2_high_risk_upload_media_when_atypical": true, "LookingUpDetector2_score_threshold": 0.7, "LooseDetectorModule_acc_gyr_sampling_frequency": 200, "LooseDetectorModule_butterworth_order": 1, "LooseDetectorModule_gyro_scale_factor": 100.0, "LooseDetectorModule_heuristic_atypical_misoriented_trigger_value": 1.0, "LooseDetectorModule_heuristic_crash_net_loose_trigger_value": 0.6, "LooseDetectorModule_heuristic_decay_rate": 0.0001666, "LooseDetectorModule_heuristic_loose_trigger_value": 0.2, "LooseDetectorModule_heuristic_use_atypical_misoriented": false, "LooseDetectorModule_high_pass_freq": 0.1, "LooseDetectorModule_k_value": 2000, "LooseDetectorModule_low_pass_freq": 5.0, "LooseDetectorModule_min_accel_power": 0.21, "LooseDetectorModule_min_gyro_power": 0.44, "LooseDetectorModule_peak_count_threshold": 20, "LooseDetectorModule_peak_value_threshold": 0.01, "LooseDetectorModule_power_ratio_threshold": 20.0, "LooseDetectorModule_stop_file_upload_when_loose": false, "LooseDetectorModule_time_threshold_in_seconds": 10, "ManeuverService_accel_braking_filter_enable": true, "ManeuverService_accel_braking_filter_event_timegap_threshold_ms": 500, "ManeuverService_accel_braking_filter_long_event_length_threshold_ms": 4000, "ManeuverService_accel_high_enable_debug_audio": true, "ManeuverService_accel_high_media_lockout_ms": -1, "ManeuverService_accel_high_media_profile": "SNAPSHOTS", "ManeuverService_accel_high_upload_media_when_atypical": false, "ManeuverService_accel_low_enable_debug_audio": true, "ManeuverService_accel_low_media_lockout_ms": -1, "ManeuverService_accel_low_media_profile": "SNAPSHOTS", "ManeuverService_accel_low_upload_media_when_atypical": false, "ManeuverService_accel_medium_enable_debug_audio": true, "ManeuverService_accel_medium_media_lockout_ms": -1, "ManeuverService_accel_medium_media_profile": "SNAPSHOTS", "ManeuverService_accel_medium_upload_media_when_atypical": false, "ManeuverService_adaptive_collision_trigger_enable_debug_audio": false, "ManeuverService_adaptive_collision_trigger_media_lockout_ms": -1, "ManeuverService_adaptive_collision_trigger_media_profile": "NO_MEDIA", "ManeuverService_adaptive_collision_trigger_upload_media_when_atypical": false, "ManeuverService_backing_up_enable_debug_audio": true, "ManeuverService_backing_up_media_lockout_ms": -1, "ManeuverService_backing_up_media_profile": "SENSOR_ONLY", "ManeuverService_backing_up_upload_media_when_atypical": false, "ManeuverService_braking_high_enable_debug_audio": true, "ManeuverService_braking_high_media_lockout_ms": -1, "ManeuverService_braking_high_media_profile": "VIDEO_SHORT", "ManeuverService_braking_high_upload_media_when_atypical": false, "ManeuverService_braking_low_enable_debug_audio": true, "ManeuverService_braking_low_media_lockout_ms": -1, "ManeuverService_braking_low_media_profile": "VIDEO_SHORT", "ManeuverService_braking_low_upload_media_when_atypical": false, "ManeuverService_braking_medium_enable_debug_audio": true, "ManeuverService_braking_medium_media_lockout_ms": -1, "ManeuverService_braking_medium_media_profile": "VIDEO_SHORT", "ManeuverService_braking_medium_upload_media_when_atypical": false, "ManeuverService_corner_left_high_enable_debug_audio": true, "ManeuverService_corner_left_high_media_lockout_ms": -1, "ManeuverService_corner_left_high_media_profile": "SNAPSHOTS", "ManeuverService_corner_left_high_upload_media_when_atypical": false, "ManeuverService_corner_left_low_enable_debug_audio": true, "ManeuverService_corner_left_low_media_lockout_ms": -1, "ManeuverService_corner_left_low_media_profile": "SNAPSHOTS", "ManeuverService_corner_left_low_upload_media_when_atypical": false, "ManeuverService_corner_left_medium_enable_debug_audio": true, "ManeuverService_corner_left_medium_media_lockout_ms": -1, "ManeuverService_corner_left_medium_media_profile": "SNAPSHOTS", "ManeuverService_corner_left_medium_upload_media_when_atypical": false, "ManeuverService_corner_right_high_enable_debug_audio": true, "ManeuverService_corner_right_high_media_lockout_ms": -1, "ManeuverService_corner_right_high_media_profile": "SNAPSHOTS", "ManeuverService_corner_right_high_upload_media_when_atypical": false, "ManeuverService_corner_right_low_enable_debug_audio": true, "ManeuverService_corner_right_low_media_lockout_ms": -1, "ManeuverService_corner_right_low_media_profile": "SNAPSHOTS", "ManeuverService_corner_right_low_upload_media_when_atypical": false, "ManeuverService_corner_right_medium_enable_debug_audio": true, "ManeuverService_corner_right_medium_media_lockout_ms": -1, "ManeuverService_corner_right_medium_media_profile": "SNAPSHOTS", "ManeuverService_corner_right_medium_upload_media_when_atypical": false, "ManeuverService_deliberate_braking_enable_debug_audio": false, "ManeuverService_deliberate_braking_media_lockout_ms": -1, "ManeuverService_deliberate_braking_media_profile": "NO_EVENT", "ManeuverService_deliberate_braking_upload_media_when_atypical": false, "ManeuverService_device_not_oriented_filter_enable": true, "ManeuverService_device_orientation_send_messages": true, "ManeuverService_enable_accel_braking": true, "ManeuverService_enable_adaptive_collision_trigger": true, "ManeuverService_enable_back_up_algorithm": false, "ManeuverService_enable_corner_left_right": true, "ManeuverService_enable_deliberate_braking": true, "ManeuverService_enable_device_orientation": true, "ManeuverService_enable_left_right_turn": true, "ManeuverService_enable_lowered_g": true, "ManeuverService_enable_moving_stopped": true, "ManeuverService_enable_severe_g": true, "ManeuverService_enable_side_swipe_algorithm": false, "ManeuverService_enable_startled_braking": true, "ManeuverService_enable_vehicle_dynamics_collision_algorithm": false, "ManeuverService_enabled": true, "ManeuverService_filter_before_orientation_convergence_accel": true, "ManeuverService_filter_before_orientation_convergence_adaptive_collision_trigger": false, "ManeuverService_filter_before_orientation_convergence_back_up": true, "ManeuverService_filter_before_orientation_convergence_braking": true, "ManeuverService_filter_before_orientation_convergence_corner_left": true, "ManeuverService_filter_before_orientation_convergence_corner_right": true, "ManeuverService_filter_before_orientation_convergence_deliberate_braking": true, "ManeuverService_filter_before_orientation_convergence_left_right": true, "ManeuverService_filter_before_orientation_convergence_severe_g": false, "ManeuverService_filter_before_orientation_convergence_side_swipe": true, "ManeuverService_filter_before_orientation_convergence_startled_braking": true, "ManeuverService_filter_before_orientation_convergence_vehicle_dynamics_collision": true, "ManeuverService_filter_while_loose_device_accel": true, "ManeuverService_filter_while_loose_device_adaptive_collision_trigger": false, "ManeuverService_filter_while_loose_device_back_up": true, "ManeuverService_filter_while_loose_device_braking": true, "ManeuverService_filter_while_loose_device_corner_left": true, "ManeuverService_filter_while_loose_device_corner_right": true, "ManeuverService_filter_while_loose_device_deliberate_braking": true, "ManeuverService_filter_while_loose_device_left_right": true, "ManeuverService_filter_while_loose_device_severe_g": true, "ManeuverService_filter_while_loose_device_side_swipe": true, "ManeuverService_filter_while_loose_device_startled_braking": true, "ManeuverService_filter_while_loose_device_vehicle_dynamics_collision": true, "ManeuverService_is_main_module": true, "ManeuverService_left_right_turn_enable_debug_audio": false, "ManeuverService_left_right_turn_media_lockout_ms": -1, "ManeuverService_left_right_turn_media_profile": "NO_EVENT", "ManeuverService_left_right_turn_upload_media_when_atypical": false, "ManeuverService_loose_device_filter_enable": false, "ManeuverService_lowered_g_enable_debug_audio": false, "ManeuverService_lowered_g_media_lockout_ms": -1, "ManeuverService_lowered_g_media_profile": "SENSOR_ONLY", "ManeuverService_lowered_g_upload_media_when_atypical": false, "ManeuverService_moving_stopped_enable_debug_audio": false, "ManeuverService_moving_stopped_media_lockout_ms": -1, "ManeuverService_moving_stopped_media_profile": "NO_EVENT", "ManeuverService_moving_stopped_upload_media_when_atypical": false, "ManeuverService_severe_g_enable_debug_audio": true, "ManeuverService_severe_g_media_lockout_ms": -1, "ManeuverService_severe_g_media_profile": "VIDEO_LONG", "ManeuverService_severe_g_upload_media_when_atypical": false, "ManeuverService_startled_braking_enable_debug_audio": true, "ManeuverService_startled_braking_media_lockout_ms": -1, "ManeuverService_startled_braking_media_profile": "NO_MEDIA", "ManeuverService_startled_braking_upload_media_when_atypical": false, "ManeuverService_startled_braking_version_bitmap": 3, "McodService_default_model_version": 2, "McodService_degradation_threshold": 1.0, "McodService_enabled": true, "McodService_frame_interval_ms": 166, "McodService_minimum_polygon_vertex_count": 4, "McodService_minimum_speed_miph": 20.0, "McodService_polygon_width_scale": 1.5, "McodService_runtime": "GPU", "McodService_skip_processing_checks": false, "McodService_speed_timestamp_tolerance_s": 30.0, "MediaEventProcessor_allow_custom_snapshots": true, "MediaProfiles_crashnet_camera_selection": 3, "MediaProfiles_crashnet_cellular_upload_capped_behaviour": "CRASHNET", "MediaProfiles_crashnet_enable_debug_audio": true, "MediaProfiles_crashnet_media_lockout_behaviour": "BOUNCE", "MediaProfiles_crashnet_media_lockout_ms": 0, "MediaProfiles_crashnet_send_event": true, "MediaProfiles_crashnet_sensor_after_s": 10, "MediaProfiles_crashnet_sensor_before_s": 10, "MediaProfiles_crashnet_sensor_length_cap_s": 30, "MediaProfiles_crashnet_sensor_upload_probability": 100, "MediaProfiles_crashnet_snapshot_upload_probability": 0, "MediaProfiles_crashnet_snapshots_after_s": 1, "MediaProfiles_crashnet_snapshots_before_s": 1, "MediaProfiles_crashnet_snapshots_count": 4, "MediaProfiles_crashnet_upload_media_when_atypical": false, "MediaProfiles_crashnet_video_after_s": 2, "MediaProfiles_crashnet_video_before_s": 2, "MediaProfiles_crashnet_video_length_cap_s": 20, "MediaProfiles_crashnet_video_upload_probability": 100, "MediaProfiles_extra1_camera_selection": 3, "MediaProfiles_extra1_cellular_upload_capped_behaviour": "NO_MEDIA", "MediaProfiles_extra1_enable_debug_audio": true, "MediaProfiles_extra1_media_lockout_behaviour": "BOUNCE", "MediaProfiles_extra1_media_lockout_ms": 0, "MediaProfiles_extra1_send_event": true, "MediaProfiles_extra1_sensor_after_s": 10, "MediaProfiles_extra1_sensor_before_s": 10, "MediaProfiles_extra1_sensor_length_cap_s": 30, "MediaProfiles_extra1_sensor_upload_probability": 0, "MediaProfiles_extra1_snapshot_upload_probability": 0, "MediaProfiles_extra1_snapshots_after_s": 1, "MediaProfiles_extra1_snapshots_before_s": 1, "MediaProfiles_extra1_snapshots_count": 4, "MediaProfiles_extra1_upload_media_when_atypical": false, "MediaProfiles_extra1_video_after_s": 0, "MediaProfiles_extra1_video_before_s": 0, "MediaProfiles_extra1_video_length_cap_s": 20, "MediaProfiles_extra1_video_upload_probability": 0, "MediaProfiles_extra2_camera_selection": 3, "MediaProfiles_extra2_cellular_upload_capped_behaviour": "NO_MEDIA", "MediaProfiles_extra2_enable_debug_audio": true, "MediaProfiles_extra2_media_lockout_behaviour": "BOUNCE", "MediaProfiles_extra2_media_lockout_ms": 0, "MediaProfiles_extra2_send_event": true, "MediaProfiles_extra2_sensor_after_s": 10, "MediaProfiles_extra2_sensor_before_s": 10, "MediaProfiles_extra2_sensor_length_cap_s": 30, "MediaProfiles_extra2_sensor_upload_probability": 0, "MediaProfiles_extra2_snapshot_upload_probability": 0, "MediaProfiles_extra2_snapshots_after_s": 1, "MediaProfiles_extra2_snapshots_before_s": 1, "MediaProfiles_extra2_snapshots_count": 4, "MediaProfiles_extra2_upload_media_when_atypical": false, "MediaProfiles_extra2_video_after_s": 0, "MediaProfiles_extra2_video_before_s": 0, "MediaProfiles_extra2_video_length_cap_s": 20, "MediaProfiles_extra2_video_upload_probability": 0, "MediaProfiles_extra3_camera_selection": 3, "MediaProfiles_extra3_cellular_upload_capped_behaviour": "NO_MEDIA", "MediaProfiles_extra3_enable_debug_audio": true, "MediaProfiles_extra3_media_lockout_behaviour": "BOUNCE", "MediaProfiles_extra3_media_lockout_ms": 0, "MediaProfiles_extra3_send_event": true, "MediaProfiles_extra3_sensor_after_s": 10, "MediaProfiles_extra3_sensor_before_s": 10, "MediaProfiles_extra3_sensor_length_cap_s": 30, "MediaProfiles_extra3_sensor_upload_probability": 0, "MediaProfiles_extra3_snapshot_upload_probability": 0, "MediaProfiles_extra3_snapshots_after_s": 1, "MediaProfiles_extra3_snapshots_before_s": 1, "MediaProfiles_extra3_snapshots_count": 4, "MediaProfiles_extra3_upload_media_when_atypical": false, "MediaProfiles_extra3_video_after_s": 0, "MediaProfiles_extra3_video_before_s": 0, "MediaProfiles_extra3_video_length_cap_s": 20, "MediaProfiles_extra3_video_upload_probability": 0, "MediaProfiles_extra4_camera_selection": 3, "MediaProfiles_extra4_cellular_upload_capped_behaviour": "NO_MEDIA", "MediaProfiles_extra4_enable_debug_audio": true, "MediaProfiles_extra4_media_lockout_behaviour": "BOUNCE", "MediaProfiles_extra4_media_lockout_ms": 0, "MediaProfiles_extra4_send_event": true, "MediaProfiles_extra4_sensor_after_s": 10, "MediaProfiles_extra4_sensor_before_s": 10, "MediaProfiles_extra4_sensor_length_cap_s": 30, "MediaProfiles_extra4_sensor_upload_probability": 0, "MediaProfiles_extra4_snapshot_upload_probability": 0, "MediaProfiles_extra4_snapshots_after_s": 1, "MediaProfiles_extra4_snapshots_before_s": 1, "MediaProfiles_extra4_snapshots_count": 4, "MediaProfiles_extra4_upload_media_when_atypical": false, "MediaProfiles_extra4_video_after_s": 0, "MediaProfiles_extra4_video_before_s": 0, "MediaProfiles_extra4_video_length_cap_s": 20, "MediaProfiles_extra4_video_upload_probability": 0, "MediaProfiles_extra5_camera_selection": 3, "MediaProfiles_extra5_cellular_upload_capped_behaviour": "NO_MEDIA", "MediaProfiles_extra5_enable_debug_audio": true, "MediaProfiles_extra5_media_lockout_behaviour": "BOUNCE", "MediaProfiles_extra5_media_lockout_ms": 0, "MediaProfiles_extra5_send_event": true, "MediaProfiles_extra5_sensor_after_s": 10, "MediaProfiles_extra5_sensor_before_s": 10, "MediaProfiles_extra5_sensor_length_cap_s": 30, "MediaProfiles_extra5_sensor_upload_probability": 0, "MediaProfiles_extra5_snapshot_upload_probability": 0, "MediaProfiles_extra5_snapshots_after_s": 1, "MediaProfiles_extra5_snapshots_before_s": 1, "MediaProfiles_extra5_snapshots_count": 4, "MediaProfiles_extra5_upload_media_when_atypical": false, "MediaProfiles_extra5_video_after_s": 0, "MediaProfiles_extra5_video_before_s": 0, "MediaProfiles_extra5_video_length_cap_s": 20, "MediaProfiles_extra5_video_upload_probability": 0, "MediaProfiles_extra6_camera_selection": 3, "MediaProfiles_extra6_cellular_upload_capped_behaviour": "NO_MEDIA", "MediaProfiles_extra6_enable_debug_audio": true, "MediaProfiles_extra6_media_lockout_behaviour": "BOUNCE", "MediaProfiles_extra6_media_lockout_ms": 0, "MediaProfiles_extra6_send_event": true, "MediaProfiles_extra6_sensor_after_s": 10, "MediaProfiles_extra6_sensor_before_s": 10, "MediaProfiles_extra6_sensor_length_cap_s": 30, "MediaProfiles_extra6_sensor_upload_probability": 0, "MediaProfiles_extra6_snapshot_upload_probability": 0, "MediaProfiles_extra6_snapshots_after_s": 1, "MediaProfiles_extra6_snapshots_before_s": 1, "MediaProfiles_extra6_snapshots_count": 4, "MediaProfiles_extra6_upload_media_when_atypical": false, "MediaProfiles_extra6_video_after_s": 0, "MediaProfiles_extra6_video_before_s": 0, "MediaProfiles_extra6_video_length_cap_s": 20, "MediaProfiles_extra6_video_upload_probability": 0, "MediaProfiles_extra7_camera_selection": 3, "MediaProfiles_extra7_cellular_upload_capped_behaviour": "NO_MEDIA", "MediaProfiles_extra7_enable_debug_audio": true, "MediaProfiles_extra7_media_lockout_behaviour": "BOUNCE", "MediaProfiles_extra7_media_lockout_ms": 0, "MediaProfiles_extra7_send_event": true, "MediaProfiles_extra7_sensor_after_s": 10, "MediaProfiles_extra7_sensor_before_s": 10, "MediaProfiles_extra7_sensor_length_cap_s": 30, "MediaProfiles_extra7_sensor_upload_probability": 0, "MediaProfiles_extra7_snapshot_upload_probability": 0, "MediaProfiles_extra7_snapshots_after_s": 1, "MediaProfiles_extra7_snapshots_before_s": 1, "MediaProfiles_extra7_snapshots_count": 4, "MediaProfiles_extra7_upload_media_when_atypical": false, "MediaProfiles_extra7_video_after_s": 0, "MediaProfiles_extra7_video_before_s": 0, "MediaProfiles_extra7_video_length_cap_s": 20, "MediaProfiles_extra7_video_upload_probability": 0, "MediaProfiles_no_event_camera_selection": 3, "MediaProfiles_no_event_cellular_upload_capped_behaviour": "NO_EVENT", "MediaProfiles_no_event_enable_debug_audio": true, "MediaProfiles_no_event_media_lockout_behaviour": "NO_EVENT", "MediaProfiles_no_event_media_lockout_ms": 0, "MediaProfiles_no_event_send_event": false, "MediaProfiles_no_event_sensor_after_s": 10, "MediaProfiles_no_event_sensor_before_s": 10, "MediaProfiles_no_event_sensor_length_cap_s": 30, "MediaProfiles_no_event_sensor_upload_probability": 0, "MediaProfiles_no_event_snapshot_upload_probability": 0, "MediaProfiles_no_event_snapshots_after_s": 1, "MediaProfiles_no_event_snapshots_before_s": 1, "MediaProfiles_no_event_snapshots_count": 4, "MediaProfiles_no_event_upload_media_when_atypical": false, "MediaProfiles_no_event_video_after_s": 0, "MediaProfiles_no_event_video_before_s": 0, "MediaProfiles_no_event_video_length_cap_s": 20, "MediaProfiles_no_event_video_upload_probability": 0, "MediaProfiles_no_media_camera_selection": 3, "MediaProfiles_no_media_cellular_upload_capped_behaviour": "NO_MEDIA", "MediaProfiles_no_media_enable_debug_audio": true, "MediaProfiles_no_media_media_lockout_behaviour": "BOUNCE", "MediaProfiles_no_media_media_lockout_ms": 0, "MediaProfiles_no_media_send_event": true, "MediaProfiles_no_media_sensor_after_s": 10, "MediaProfiles_no_media_sensor_before_s": 10, "MediaProfiles_no_media_sensor_length_cap_s": 30, "MediaProfiles_no_media_sensor_upload_probability": 0, "MediaProfiles_no_media_snapshot_upload_probability": 0, "MediaProfiles_no_media_snapshots_after_s": 1, "MediaProfiles_no_media_snapshots_before_s": 1, "MediaProfiles_no_media_snapshots_count": 4, "MediaProfiles_no_media_upload_media_when_atypical": false, "MediaProfiles_no_media_video_after_s": 0, "MediaProfiles_no_media_video_before_s": 0, "MediaProfiles_no_media_video_length_cap_s": 20, "MediaProfiles_no_media_video_upload_probability": 0, "MediaProfiles_safety_incident_camera_selection": 3, "MediaProfiles_safety_incident_cellular_upload_capped_behaviour": "SAFETY_INCIDENT", "MediaProfiles_safety_incident_enable_debug_audio": true, "MediaProfiles_safety_incident_media_lockout_behaviour": "BOUNCE", "MediaProfiles_safety_incident_media_lockout_ms": 0, "MediaProfiles_safety_incident_send_event": true, "MediaProfiles_safety_incident_sensor_after_s": 10, "MediaProfiles_safety_incident_sensor_before_s": 10, "MediaProfiles_safety_incident_sensor_length_cap_s": 30, "MediaProfiles_safety_incident_sensor_upload_probability": 100, "MediaProfiles_safety_incident_snapshot_upload_probability": 0, "MediaProfiles_safety_incident_snapshots_after_s": 1, "MediaProfiles_safety_incident_snapshots_before_s": 1, "MediaProfiles_safety_incident_snapshots_count": 4, "MediaProfiles_safety_incident_upload_media_when_atypical": false, "MediaProfiles_safety_incident_video_after_s": 0, "MediaProfiles_safety_incident_video_before_s": 0, "MediaProfiles_safety_incident_video_length_cap_s": 20, "MediaProfiles_safety_incident_video_upload_probability": 100, "MediaProfiles_sensor_only_camera_selection": 3, "MediaProfiles_sensor_only_cellular_upload_capped_behaviour": "NO_MEDIA", "MediaProfiles_sensor_only_enable_debug_audio": true, "MediaProfiles_sensor_only_media_lockout_behaviour": "BOUNCE", "MediaProfiles_sensor_only_media_lockout_ms": 0, "MediaProfiles_sensor_only_send_event": true, "MediaProfiles_sensor_only_sensor_after_s": 10, "MediaProfiles_sensor_only_sensor_before_s": 10, "MediaProfiles_sensor_only_sensor_length_cap_s": 30, "MediaProfiles_sensor_only_sensor_upload_probability": 100, "MediaProfiles_sensor_only_snapshot_upload_probability": 0, "MediaProfiles_sensor_only_snapshots_after_s": 1, "MediaProfiles_sensor_only_snapshots_before_s": 1, "MediaProfiles_sensor_only_snapshots_count": 4, "MediaProfiles_sensor_only_upload_media_when_atypical": false, "MediaProfiles_sensor_only_video_after_s": 0, "MediaProfiles_sensor_only_video_before_s": 0, "MediaProfiles_sensor_only_video_length_cap_s": 20, "MediaProfiles_sensor_only_video_upload_probability": 0, "MediaProfiles_snapshot_single_camera_selection": 3, "MediaProfiles_snapshot_single_cellular_upload_capped_behaviour": "NO_MEDIA", "MediaProfiles_snapshot_single_enable_debug_audio": true, "MediaProfiles_snapshot_single_media_lockout_behaviour": "BOUNCE", "MediaProfiles_snapshot_single_media_lockout_ms": 0, "MediaProfiles_snapshot_single_send_event": true, "MediaProfiles_snapshot_single_sensor_after_s": 10, "MediaProfiles_snapshot_single_sensor_before_s": 10, "MediaProfiles_snapshot_single_sensor_length_cap_s": 30, "MediaProfiles_snapshot_single_sensor_upload_probability": 100, "MediaProfiles_snapshot_single_snapshot_upload_probability": 100, "MediaProfiles_snapshot_single_snapshots_after_s": 0, "MediaProfiles_snapshot_single_snapshots_before_s": 0, "MediaProfiles_snapshot_single_snapshots_count": 1, "MediaProfiles_snapshot_single_upload_media_when_atypical": false, "MediaProfiles_snapshot_single_video_after_s": 0, "MediaProfiles_snapshot_single_video_before_s": 0, "MediaProfiles_snapshot_single_video_length_cap_s": 20, "MediaProfiles_snapshot_single_video_upload_probability": 0, "MediaProfiles_snapshots_camera_selection": 3, "MediaProfiles_snapshots_cellular_upload_capped_behaviour": "NO_MEDIA", "MediaProfiles_snapshots_enable_debug_audio": true, "MediaProfiles_snapshots_long_camera_selection": 3, "MediaProfiles_snapshots_long_cellular_upload_capped_behaviour": "NO_MEDIA", "MediaProfiles_snapshots_long_enable_debug_audio": true, "MediaProfiles_snapshots_long_media_lockout_behaviour": "BOUNCE", "MediaProfiles_snapshots_long_media_lockout_ms": 0, "MediaProfiles_snapshots_long_send_event": true, "MediaProfiles_snapshots_long_sensor_after_s": 10, "MediaProfiles_snapshots_long_sensor_before_s": 10, "MediaProfiles_snapshots_long_sensor_length_cap_s": 30, "MediaProfiles_snapshots_long_sensor_upload_probability": 100, "MediaProfiles_snapshots_long_snapshot_upload_probability": 100, "MediaProfiles_snapshots_long_snapshots_after_s": 2, "MediaProfiles_snapshots_long_snapshots_before_s": 2, "MediaProfiles_snapshots_long_snapshots_count": 6, "MediaProfiles_snapshots_long_upload_media_when_atypical": false, "MediaProfiles_snapshots_long_video_after_s": 0, "MediaProfiles_snapshots_long_video_before_s": 0, "MediaProfiles_snapshots_long_video_length_cap_s": 20, "MediaProfiles_snapshots_long_video_upload_probability": 0, "MediaProfiles_snapshots_media_lockout_behaviour": "BOUNCE", "MediaProfiles_snapshots_media_lockout_ms": 0, "MediaProfiles_snapshots_send_event": true, "MediaProfiles_snapshots_sensor_after_s": 10, "MediaProfiles_snapshots_sensor_before_s": 10, "MediaProfiles_snapshots_sensor_length_cap_s": 30, "MediaProfiles_snapshots_sensor_upload_probability": 100, "MediaProfiles_snapshots_snapshot_upload_probability": 100, "MediaProfiles_snapshots_snapshots_after_s": 1, "MediaProfiles_snapshots_snapshots_before_s": 1, "MediaProfiles_snapshots_snapshots_count": 4, "MediaProfiles_snapshots_upload_media_when_atypical": false, "MediaProfiles_snapshots_video_after_s": 0, "MediaProfiles_snapshots_video_before_s": 0, "MediaProfiles_snapshots_video_length_cap_s": 20, "MediaProfiles_snapshots_video_upload_probability": 0, "MediaProfiles_video_long_camera_selection": 3, "MediaProfiles_video_long_cellular_upload_capped_behaviour": "NO_MEDIA", "MediaProfiles_video_long_enable_debug_audio": true, "MediaProfiles_video_long_media_lockout_behaviour": "BOUNCE", "MediaProfiles_video_long_media_lockout_ms": 0, "MediaProfiles_video_long_send_event": true, "MediaProfiles_video_long_sensor_after_s": 30, "MediaProfiles_video_long_sensor_before_s": 60, "MediaProfiles_video_long_sensor_length_cap_s": 120, "MediaProfiles_video_long_sensor_upload_probability": 100, "MediaProfiles_video_long_snapshot_upload_probability": 0, "MediaProfiles_video_long_snapshots_after_s": 1, "MediaProfiles_video_long_snapshots_before_s": 1, "MediaProfiles_video_long_snapshots_count": 4, "MediaProfiles_video_long_upload_media_when_atypical": false, "MediaProfiles_video_long_video_after_s": 15, "MediaProfiles_video_long_video_before_s": 15, "MediaProfiles_video_long_video_length_cap_s": 45, "MediaProfiles_video_long_video_upload_probability": 100, "MediaProfiles_video_medium_camera_selection": 3, "MediaProfiles_video_medium_cellular_upload_capped_behaviour": "NO_MEDIA", "MediaProfiles_video_medium_enable_debug_audio": true, "MediaProfiles_video_medium_media_lockout_behaviour": "BOUNCE", "MediaProfiles_video_medium_media_lockout_ms": 0, "MediaProfiles_video_medium_send_event": true, "MediaProfiles_video_medium_sensor_after_s": 10, "MediaProfiles_video_medium_sensor_before_s": 10, "MediaProfiles_video_medium_sensor_length_cap_s": 30, "MediaProfiles_video_medium_sensor_upload_probability": 100, "MediaProfiles_video_medium_snapshot_upload_probability": 0, "MediaProfiles_video_medium_snapshots_after_s": 1, "MediaProfiles_video_medium_snapshots_before_s": 1, "MediaProfiles_video_medium_snapshots_count": 4, "MediaProfiles_video_medium_upload_media_when_atypical": false, "MediaProfiles_video_medium_video_after_s": 5, "MediaProfiles_video_medium_video_before_s": 5, "MediaProfiles_video_medium_video_length_cap_s": 20, "MediaProfiles_video_medium_video_upload_probability": 100, "MediaProfiles_video_short_camera_selection": 3, "MediaProfiles_video_short_cellular_upload_capped_behaviour": "NO_MEDIA", "MediaProfiles_video_short_enable_debug_audio": true, "MediaProfiles_video_short_media_lockout_behaviour": "BOUNCE", "MediaProfiles_video_short_media_lockout_ms": 0, "MediaProfiles_video_short_send_event": true, "MediaProfiles_video_short_sensor_after_s": 10, "MediaProfiles_video_short_sensor_before_s": 10, "MediaProfiles_video_short_sensor_length_cap_s": 30, "MediaProfiles_video_short_sensor_upload_probability": 100, "MediaProfiles_video_short_snapshot_upload_probability": 0, "MediaProfiles_video_short_snapshots_after_s": 1, "MediaProfiles_video_short_snapshots_before_s": 1, "MediaProfiles_video_short_snapshots_count": 4, "MediaProfiles_video_short_upload_media_when_atypical": false, "MediaProfiles_video_short_video_after_s": 2, "MediaProfiles_video_short_video_before_s": 2, "MediaProfiles_video_short_video_length_cap_s": 20, "MediaProfiles_video_short_video_upload_probability": 100, "MemoryObserver_detection_interval_ms": 240000, "MemoryObserver_dump_duration_ms": 600000, "MemoryObserver_enable": true, "MemoryObserver_java_heap_limit_MB": 128, "MemoryObserver_java_large_heap_limit_MB": 256, "MemoryObserver_large_jheap_apps": "com.nauto.n3.core", "MemoryObserver_native_heap_limit_MB": 512, "MemoryObserver_processes_pattern": "nauto", "MemoryObserver_total_heap_limit_MB": 2048, "MessagePbRunnable_high_batch_size": 8, "MessagePbRunnable_high_max_queue_length": 10000, "MessagePbRunnable_highest_batch_size": 4, "MessagePbRunnable_highest_max_queue_length": 5000, "MessagePbRunnable_low_batch_size": 32, "MessagePbRunnable_low_max_queue_length": 10000, "MessagePbRunnable_maximum_payload_size": 256000, "MessagePbRunnable_normal_batch_size": 16, "MessagePbRunnable_normal_max_queue_length": 10000, "MessageRunnable_high_batch_size": 8, "MessageRunnable_high_max_queue_length": 10000, "MessageRunnable_highest_batch_size": 4, "MessageRunnable_highest_max_queue_length": 5000, "MessageRunnable_low_batch_size": 32, "MessageRunnable_low_max_queue_length": 10000, "MessageRunnable_maximum_payload_size": 256000, "MessageRunnable_mobile_data_quiet_depth": 2, "MessageRunnable_normal_batch_size": 16, "MessageRunnable_normal_max_queue_length": 10000, "MessagingEndpoint_connection_timeout": 30000, "MessagingEndpoint_messaging_endpoint_type": "V1", "MessagingEndpoint_read_timeout": 300000, "MessagingEndpoint_write_timeout": 300000, "NautoApplication_2nd_gsensor_motion_threshold": 0, "NautoApplication_adb_mode": 2, "NautoApplication_apply_config_update_only_when_parked": false, "NautoApplication_camera_mirroring_enabled": true, "NautoApplication_camera_on": true, "NautoApplication_camera_perflock_enabled": false, "NautoApplication_cnn_temperature_max": 90.0, "NautoApplication_config_reset_to_default_before_applying": true, "NautoApplication_default_volume": 0.8, "NautoApplication_device_region": "us", "NautoApplication_diagnostics_report_graphics_enabled": false, "NautoApplication_diagnostics_report_sound_enabled": false, "NautoApplication_dirty_expire_centisecs": -1, "NautoApplication_dirty_writeback_centisecs": -1, "NautoApplication_disable_driver_id_upload": false, "NautoApplication_discovery_polling_interval": 120000, "NautoApplication_discovery_retry_interval": 60000, "NautoApplication_do_not_park_debug": false, "NautoApplication_downstream_snapshot_upload_policy": 3, "NautoApplication_downstream_video_upload_policy": 3, "NautoApplication_enable_firmware_logging": true, "NautoApplication_event_snapshot_upload_policy": 3, "NautoApplication_event_video_upload_policy": 3, "NautoApplication_gps_frequency": 1000, "NautoApplication_gps_on": true, "NautoApplication_health_check_interval": 60000, "NautoApplication_initialize_delay_ms": 60000, "NautoApplication_internal_camera_on": true, "NautoApplication_logcat_file": "log.txt", "NautoApplication_logcat_file_size_kb": 102400, "NautoApplication_logcat_folder": "logs", "NautoApplication_logcat_kernel_logs_enabled": true, "NautoApplication_logcat_num_files": 10, "NautoApplication_logcat_radio_logs_enabled": true, "NautoApplication_logcat_radio_logs_file": "radio_log.txt", "NautoApplication_loose_detector_on": true, "NautoApplication_message_type_overriding_upload_policy": "severe-g-event,mark,mark-panic", "NautoApplication_min_log_level": 4, "NautoApplication_minimum_calibration_speed": 45.0, "NautoApplication_minimum_volume": 0.5, "NautoApplication_mobile_data_on": true, "NautoApplication_module_supervisor_future_get_timeout_ms": 20000, "NautoApplication_needs_calibration": true, "NautoApplication_register_retry_delay": 1200000, "NautoApplication_register_retry_interval_ms": 60000, "NautoApplication_register_short_retry_delay": 60000, "NautoApplication_scheduled_snapshot_upload_policy": 3, "NautoApplication_send_checksum_on": true, "NautoApplication_upload_all_sensor_data": false, "NautoApplication_usb_mode": 2, "NautoApplication_use_cloudcomm_for_upload": true, "NautoApplication_use_sensor_and_boot_session_for_trimming": true, "NautoApplication_vehicle_dynamics_on": true, "NautoApplication_vehicle_state_frequency": 3000, "NautoApplication_wake_on_audio_threshold": 0, "NautoApplication_wifi_on": true, "NautoApplication_wom_sensitivity": 3, "NautoApplication_wom_threshold": 14, "NautoUpdate_aosp_ota_attempts_period": 12, "NautoUpdate_apk_ota_attempts_period": 24, "NautoUpdate_block_reboots_during_ota": true, "NautoUpdate_cnn_ota_attempts_period": 24, "NautoUpdate_firmware_ota_attempts_period": 12, "NautoUpdate_install_when_parked": true, "NautoUpdate_installation_lock_enabled": false, "NautoUpdate_installation_lock_timeout": 300000, "NautoUpdate_max_aosp_ota_attempts_per_period": 1, "NautoUpdate_max_apk_ota_attempts_per_period": 3, "NautoUpdate_max_cnn_ota_attempts_per_period": 3, "NautoUpdate_max_firmware_ota_attempts_per_period": 3, "NautoUpdate_max_sierra_ota_attempts_per_period": 1, "NautoUpdate_max_time_without_config_update_ms": 43200000, "NautoUpdate_message_queue_count_trim_threshold": 100, "NautoUpdate_ota_apk_packages": "com.nauto.n3.core,com.nauto.n3.update,com.nauto.n3.cloudcommunication,com.nauto.n3.config,com.nauto.n3.dhm,com.nauto.n3.navigation", "NautoUpdate_parked_state_expiration_time": 28800000, "NautoUpdate_sierra_ota_attempts_period": 24, "NautoUpdate_sierra_ota_enabled": false, "NautoUpdate_sierra_update_timeout_ms": 300000, "NautoUpdate_suppress_apk_updates": false, "NautoUpdate_timeout_before_recovery_reset_ms": 1800000, "NautoUpdate_updates_required_for_notification": "APP,FIRMWARE", "NautoUpdate_use_cloudcomm_for_messaging": true, "NautoUpdate_use_ota_server_for_all_artifacts": false, "NautoUpdate_watchdog_monitoring_enabled": true, "Nautort_enable_sensor_services": true, "Nautort_external_gps_publisher_enabled": false, "Nautort_gps_location_publisher_on": true, "Nautort_logging_level": "INFO", "Nautort_speed_publisher_on": true, "Nautort_use_tensor_flow_models": true, "Nautort_vehicle_state_publisher_on": true, "Nautort_vehicle_state_publisher_period_ms": 1000, "Nautort_weather_info_publisher_on": true, "NavigationApp_check_downloading_offline_map_interval_s": 300, "NavigationApp_offline_map_bounding_box_side_length_km": 30.0, "NavigationApp_road_attributes_traffic_info_publish_interval_s": 1, "NavigationApp_use_nauto_location_source": true, "NavigationApp_use_omnifusion_data": true, "NightlyReboot_begin_reboot_hour": 2, "NightlyReboot_enable": true, "NightlyReboot_end_reboot_hour": 4, "NightlyReboot_retry_interval_ms": 600000, "NightlyReboot_threshold_ms": 10800000, "NoFaceDetector2_duration_threshold_ms": 10000, "NoFaceDetector2_enable": true, "NoFaceDetector2_high_risk_enable_debug_audio": true, "NoFaceDetector2_high_risk_media_lockout_ms": 600000, "NoFaceDetector2_high_risk_media_profile": "SNAPSHOTS", "NoFaceDetector2_high_risk_upload_media_when_atypical": true, "NoFaceDetector2_score_threshold": 0.7, "NoSeatBeltDetector2_duration_threshold_ms": 10000, "NoSeatBeltDetector2_enable": true, "NoSeatBeltDetector2_high_risk_enable_debug_audio": true, "NoSeatBeltDetector2_high_risk_media_lockout_ms": 600000, "NoSeatBeltDetector2_high_risk_media_profile": "SNAPSHOTS", "NoSeatBeltDetector2_high_risk_upload_media_when_atypical": true, "NoSeatBeltDetector2_score_threshold": 0.7, "NotLookingAtRoadDetector2_duration_threshold_ms": 2000, "NotLookingAtRoadDetector2_enable": true, "NotLookingAtRoadDetector2_high_risk_enable_debug_audio": true, "NotLookingAtRoadDetector2_high_risk_media_lockout_ms": 180000, "NotLookingAtRoadDetector2_high_risk_media_profile": "NO_MEDIA", "NotLookingAtRoadDetector2_high_risk_upload_media_when_atypical": true, "NotLookingAtRoadDetector2_score_threshold": 0.7, "ObdDongleModule_backoff_delay_s": 600, "ObdDongleModule_broadcast_listener_enabled": false, "ObdDongleModule_broadcast_listening_mode": 1, "ObdDongleModule_can_bus_protocol": -1, "ObdDongleModule_enable_payload_logging": false, "ObdDongleModule_enabled": false, "ObdDongleModule_engine_run_time_calculation_enabled": false, "ObdDongleModule_firmware_logs_request_interval_ms": 100, "ObdDongleModule_high_frequency_request_interval_ms": 1000, "ObdDongleModule_idle_threshold_rpm": 1000.0, "ObdDongleModule_listen_only_enabled": true, "ObdDongleModule_low_frequency_request_interval_ms": 60000, "ObdDongleModule_obd_interval_enabled": false, "ObdDongleModule_send_obd_to_backend": false, "ObdDongleModule_traffic_detection_delay_s": 10, "ObdDongleModule_watchdog_pet_interval_s": 60, "ObdDongleModule_woi_sample_interval_s": 5, "OmniFusion_complete_state_batch_size": 1, "OmniFusion_enabled": true, "OmniFusion_fusion_data_batch_size": 200, "OmniFusion_has_matrix_in_complete_state_gps": true, "OmniFusion_has_matrix_in_complete_state_imu": true, "OmniFusion_has_matrix_in_fusion_data_gps": false, "OmniFusion_has_matrix_in_fusion_data_imu": false, "OmniFusion_location_batch_size": 20, "OmniFusion_message_enabled": false, "OmniFusion_message_include_gps_data": false, "OmniFusion_message_interval_s": 300, "OmniFusion_message_report_every_nth_location": 202, "OmniFusion_report_every_nth_complete_state_gps": 5, "OmniFusion_report_every_nth_complete_state_imu": 1000, "OmniFusion_report_every_nth_fusion_data_gps": 1, "OmniFusion_report_every_nth_fusion_data_imu": 1, "OmniFusion_report_every_nth_location_gps": 1, "OmniFusion_report_every_nth_location_imu": 1, "OmniFusion_report_every_nth_vehicle_dynamics": 1, "OmniFusion_restore_complete_state": false, "OmniFusion_vehicle_dynamics_batch_size": 200, "OutwardCameraService_ae_antibanding_mode": 3, "OutwardCameraService_bitrate": 1000000, "OutwardCameraService_core_app_managed": true, "OutwardCameraService_enabled": true, "OutwardCameraService_enabled_noise_reduction": true, "OutwardCameraService_encoder_image_height_px": 480, "OutwardCameraService_encoder_image_width_px": 854, "OutwardCameraService_fps": 15, "OutwardCameraService_image_height_px": 1080, "OutwardCameraService_image_width_px": 1920, "OutwardCameraService_max_muxer_duration_s": 30, "OutwardCameraService_number_of_camera_buffers": 150, "OutwardCameraService_number_of_errors_before_restart": 5, "OutwardCameraService_number_of_restarts_before_reboot": 2, "OutwardCameraService_snapshot_drumbuffer_length_s": 10, "OutwardCameraService_snapshot_enabled": true, "OutwardCameraService_snapshot_expiration_interval_s": 30, "OutwardCameraService_snapshot_image_height_px": 480, "OutwardCameraService_snapshot_image_width_px": 854, "OutwardCameraService_snapshot_trigger_expiration_interval_ms": 800, "OutwardCameraService_snapshotservice_copy_frame": false, "OutwardCameraService_video_codec": 0, "OutwardCameraService_video_encoder_enabled": true, "OutwardCameraService_video_length_sec": 300, "PcwService_algorithm_logic_version": "SCALE", "PcwService_apply_smoothing": false, "PcwService_box_bottom_increase_margin_px": 2, "PcwService_consecutive_frame_num": 2, "PcwService_degradation_threshold": 4.0, "PcwService_enable": false, "PcwService_estimation_fps": 6, "PcwService_estimation_how_many_last_frames": 3, "PcwService_estimation_kappa": 1500.0, "PcwService_estimation_min_inter_threshold": 0.3, "PcwService_estimation_velocity_margin_mps": 1.0, "PcwService_event_duration_ms": 2000, "PcwService_leading_vehicle_algorithm_version": "TRIANGLE", "PcwService_min_box_height_px": 30, "PcwService_output_enable_debug_audio": true, "PcwService_output_media_lockout_ms": -1, "PcwService_output_media_profile": "NO_MEDIA", "PcwService_output_upload_media_when_atypical": true, "PcwService_scale_change_upper_limit": 1.33, "PcwService_ttc_lower_bound_s": 0.6, "PcwService_ttc_thresh_s": 1.75, "PcwService_vehicle_front_end_offset_m": 1.8, "PostFactoStopSignService_coordinate_error_threshold_m": 20.0, "PostFactoStopSignService_data_expiration_ms": 2000, "PostFactoStopSignService_enable_missing_stop_sign_report_via_volume_buttons": false, "PostFactoStopSignService_enable_stop_sign_detected_debug_audio": false, "PostFactoStopSignService_enabled": false, "PostFactoStopSignService_max_duration_without_decelerate_s": 3.0, "PostFactoStopSignService_max_duration_without_stop_s": 5.0, "PostFactoStopSignService_max_idle_speed_miph": 3.0, "PostFactoStopSignService_max_near_distance_m": 25.0, "PostFactoStopSignService_max_rolling_speed_miph": 8.0, "PostFactoStopSignService_min_near_distance_m": 10.0, "PostFactoStopSignService_min_required_stop_duration_s": 0.5, "PostFactoStopSignService_min_stop_sign_location_consecutive_count": 3, "PostFactoStopSignService_min_stop_sign_visual_consecutive_count": 3, "PostFactoStopSignService_min_visual_unseen_s": 0.5, "PostFactoStopSignService_output_enable_debug_audio": true, "PostFactoStopSignService_output_media_lockout_ms": -1, "PostFactoStopSignService_output_media_profile": "NO_MEDIA", "PostFactoStopSignService_output_upload_media_when_atypical": false, "PostFactoStopSignService_similar_location_lockout_distance_m": 25.0, "PostFactoStopSignService_similar_location_lockout_duration_s": 30.0, "PostFactoStopSignService_too_fast_threshold_miph": 30.0, "PostFactoStopSignService_use_map_traffic_sign_info": false, "PostFactoStopSignService_use_visual_intersection_distance": true, "PostFactoStopSignService_use_visual_traffic_condition": true, "PostFactoStopSignService_vehicle_status_tolerance_upper_band_miph": 1.0, "PostFactoStopSignService_velocity_error_threshold_mps": 5.0, "PostFactoStopSignService_visual_stop_line_max_near_distance_m": 25.0, "PostFactoStopSignService_visual_stop_sign_too_far_from_intersection_m": 10.0, "ProvisioningEndpoint_connection_timeout": 30000, "ProvisioningEndpoint_read_timeout": 30000, "ProvisioningEndpoint_write_timeout": 30000, "PubSubManager_future_timeout_multiplier": 3, "RealTimeAlertService_combo_alert_lockout": 5000, "RealTimeAlertService_distraction_combo_duration_band_one": 3000, "RealTimeAlertService_distraction_combo_duration_band_three": 1000, "RealTimeAlertService_distraction_combo_duration_band_two": 2000, "RealTimeAlertService_distraction_day_rta_threshold": 0.9, "RealTimeAlertService_distraction_night_rta_threshold": 0.55, "RealTimeAlertService_play_combo_alerts": false, "RealTimeAlertService_silent_rta_debug": false, "RealTimeAlertService_tailgating_alert_threshold_level_one": 1.0, "RealTimeAlertService_tailgating_alert_threshold_level_three": 1.667, "RealTimeAlertService_tailgating_alert_threshold_level_two": 1.25, "RealTimeAlertService_tailgating_combo_threshold_level_one": 1.0, "RealTimeAlertService_tailgating_combo_threshold_level_three": 1.8, "RealTimeAlertService_tailgating_combo_threshold_level_two": 1.5, "RealTimeAlertService_use_confidence_threshold": false, "RebootManager_high_priority_reboot_value": 70, "RebootManager_immediate_priority_reboot_value": 500, "RebootManager_low_priority_reboot_value": 20, "RebootManager_max_fatal_reboots_per_day": 3, "RebootManager_medium_priority_reboot_value": 40, "RebootManager_min_time_between_same_immediate_reboot_requests_s": 600, "RebootManager_moving_state_guard": 150, "RebootManager_reboot_management_enabled": true, "RebootManager_recent_reboots_multiplier": 15, "RebootManager_recent_reboots_time_window": 3600000, "RebootManager_stopped_state_guard": 70, "RebootManager_time_from_last_reboot": 3600000, "RebootManager_time_from_last_reboot_multiplier": 1, "RebootManager_usb_enum_reboot_checker_enabled": true, "RiskAssessmentService_acceleration_backend_flags": -1, "RiskAssessmentService_acceleration_enable_debug_audio": true, "RiskAssessmentService_acceleration_enabled": true, "RiskAssessmentService_acceleration_is_customer_facing": false, "RiskAssessmentService_acceleration_media_lockout_ms": -1, "RiskAssessmentService_acceleration_media_profile": "NO_MEDIA", "RiskAssessmentService_acceleration_rta_lockout_ms": 60000, "RiskAssessmentService_acceleration_severity": "LOW", "RiskAssessmentService_acceleration_should_play_rta": false, "RiskAssessmentService_acceleration_should_upload_media_when_no_alerts": false, "RiskAssessmentService_acceleration_upload_media_when_atypical": false, "RiskAssessmentService_alert_filter_delay_low_severity_delay_ms": 500, "RiskAssessmentService_alert_filter_delay_low_severity_enabled": true, "RiskAssessmentService_alert_filter_delay_low_severity_threshold_severity_lt": "MEDIUM", "RiskAssessmentService_alert_filter_short_period_enabled": true, "RiskAssessmentService_alert_filter_short_period_le_threshold_ms": 3000, "RiskAssessmentService_alert_filter_solar_position_driver_eye_horizontal_field_of_view_deg": 120.0, "RiskAssessmentService_alert_filter_solar_position_driver_eye_vertical_field_of_view_deg": 135.0, "RiskAssessmentService_alert_filter_sunrise_sunset_active_ms": 3600000, "RiskAssessmentService_braking_backend_flags": -1, "RiskAssessmentService_braking_enable_debug_audio": true, "RiskAssessmentService_braking_enabled": true, "RiskAssessmentService_braking_is_customer_facing": false, "RiskAssessmentService_braking_media_lockout_ms": -1, "RiskAssessmentService_braking_media_profile": "NO_MEDIA", "RiskAssessmentService_braking_rta_lockout_ms": 60000, "RiskAssessmentService_braking_severity": "LOW", "RiskAssessmentService_braking_should_play_rta": false, "RiskAssessmentService_braking_should_upload_media_when_no_alerts": false, "RiskAssessmentService_braking_upload_media_when_atypical": false, "RiskAssessmentService_cell_phone_backend_flags": -1, "RiskAssessmentService_cell_phone_continuous_alert_enabled": false, "RiskAssessmentService_cell_phone_continuous_alert_interval_ms": 15000, "RiskAssessmentService_cell_phone_distraction_ge_threshold_s": 5.0, "RiskAssessmentService_cell_phone_enable_debug_audio": true, "RiskAssessmentService_cell_phone_enabled": true, "RiskAssessmentService_cell_phone_is_customer_facing": false, "RiskAssessmentService_cell_phone_media_lockout_ms": -1, "RiskAssessmentService_cell_phone_media_profile": "SENSOR_ONLY", "RiskAssessmentService_cell_phone_rta_final_alert_ms": 30000, "RiskAssessmentService_cell_phone_rta_initial_alert_ms": 0, "RiskAssessmentService_cell_phone_rta_second_alert_ms": 10000, "RiskAssessmentService_cell_phone_severity": "LOW", "RiskAssessmentService_cell_phone_should_play_rta": false, "RiskAssessmentService_cell_phone_should_upload_media_when_no_alerts": false, "RiskAssessmentService_cell_phone_speed_ge_threshold_miph": 5.0, "RiskAssessmentService_cell_phone_upload_media_when_atypical": false, "RiskAssessmentService_cornering_backend_flags": -1, "RiskAssessmentService_cornering_enable_debug_audio": true, "RiskAssessmentService_cornering_enabled": true, "RiskAssessmentService_cornering_is_customer_facing": false, "RiskAssessmentService_cornering_media_lockout_ms": -1, "RiskAssessmentService_cornering_media_profile": "NO_MEDIA", "RiskAssessmentService_cornering_rta_lockout_ms": 60000, "RiskAssessmentService_cornering_severity": "LOW", "RiskAssessmentService_cornering_should_play_rta": false, "RiskAssessmentService_cornering_should_upload_media_when_no_alerts": false, "RiskAssessmentService_cornering_upload_media_when_atypical": false, "RiskAssessmentService_data_expiration_ms": 2000, "RiskAssessmentService_drowsiness_backend_flags": -1, "RiskAssessmentService_drowsiness_enable_debug_audio": true, "RiskAssessmentService_drowsiness_enabled": true, "RiskAssessmentService_drowsiness_event_continuation_s": 60.0, "RiskAssessmentService_drowsiness_is_customer_facing": false, "RiskAssessmentService_drowsiness_media_lockout_ms": -1, "RiskAssessmentService_drowsiness_media_profile": "VIDEO_MEDIUM", "RiskAssessmentService_drowsiness_rta_initial_lockout_ms": 15000, "RiskAssessmentService_drowsiness_rta_second_lockout_ms": 15000, "RiskAssessmentService_drowsiness_rta_third_lockout_ms": 15000, "RiskAssessmentService_drowsiness_severity": "CRITICAL", "RiskAssessmentService_drowsiness_should_play_rta": false, "RiskAssessmentService_drowsiness_should_upload_media_when_no_alerts": false, "RiskAssessmentService_drowsiness_speed_ge_threshold_miph": 5.0, "RiskAssessmentService_drowsiness_upload_media_when_atypical": true, "RiskAssessmentService_enabled": true, "RiskAssessmentService_fcw_backend_flags": -1, "RiskAssessmentService_fcw_distraction_backend_flags": -1, "RiskAssessmentService_fcw_distraction_distraction_ge_threshold_s": 1.0, "RiskAssessmentService_fcw_distraction_enable_debug_audio": false, "RiskAssessmentService_fcw_distraction_enabled": true, "RiskAssessmentService_fcw_distraction_is_customer_facing": false, "RiskAssessmentService_fcw_distraction_media_lockout_ms": -1, "RiskAssessmentService_fcw_distraction_media_profile": "VIDEO_MEDIUM", "RiskAssessmentService_fcw_distraction_rta_initial_alert_ms": 0, "RiskAssessmentService_fcw_distraction_rta_repeat_interval_ms": 3000, "RiskAssessmentService_fcw_distraction_rta_repeat_until_ms": 12000, "RiskAssessmentService_fcw_distraction_severity": "CRITICAL", "RiskAssessmentService_fcw_distraction_should_play_rta": false, "RiskAssessmentService_fcw_distraction_should_upload_media_when_no_alerts": false, "RiskAssessmentService_fcw_distraction_speed_ge_threshold_miph": 5.0, "RiskAssessmentService_fcw_distraction_suppression_mode": "WHILE_ACTIVE", "RiskAssessmentService_fcw_distraction_ttc_le_threshold_s": 3.0, "RiskAssessmentService_fcw_distraction_upload_media_when_atypical": true, "RiskAssessmentService_fcw_enable_debug_audio": false, "RiskAssessmentService_fcw_enabled": true, "RiskAssessmentService_fcw_is_customer_facing": false, "RiskAssessmentService_fcw_media_lockout_ms": -1, "RiskAssessmentService_fcw_media_profile": "VIDEO_MEDIUM", "RiskAssessmentService_fcw_rta_initial_alert_ms": 0, "RiskAssessmentService_fcw_rta_repeat_interval_ms": 3000, "RiskAssessmentService_fcw_rta_repeat_until_ms": 12000, "RiskAssessmentService_fcw_severity": "CRITICAL", "RiskAssessmentService_fcw_should_play_rta": false, "RiskAssessmentService_fcw_should_upload_media_when_no_alerts": false, "RiskAssessmentService_fcw_speed_ge_threshold_miph": 25.0, "RiskAssessmentService_fcw_suppression_mode": "REMAINING", "RiskAssessmentService_fcw_ttc_le_threshold_s": 1.75, "RiskAssessmentService_fcw_upload_media_when_atypical": true, "RiskAssessmentService_looking_down_backend_flags": -1, "RiskAssessmentService_looking_down_duration_ge_threshold_s": 2.5, "RiskAssessmentService_looking_down_enabled": true, "RiskAssessmentService_looking_down_high_duration_threshold_ms": 1490, "RiskAssessmentService_looking_down_high_enable_debug_audio": false, "RiskAssessmentService_looking_down_high_media_lockout_ms": 0, "RiskAssessmentService_looking_down_high_media_profile": "SNAPSHOTS", "RiskAssessmentService_looking_down_high_upload_media_when_atypical": true, "RiskAssessmentService_looking_down_is_customer_facing": false, "RiskAssessmentService_looking_down_low_enable_debug_audio": false, "RiskAssessmentService_looking_down_low_media_lockout_ms": 0, "RiskAssessmentService_looking_down_low_media_profile": "SNAPSHOTS", "RiskAssessmentService_looking_down_low_upload_media_when_atypical": true, "RiskAssessmentService_looking_down_rta_final_alert_ms": 5500, "RiskAssessmentService_looking_down_rta_initial_alert_ms": 2500, "RiskAssessmentService_looking_down_rta_second_alert_ms": 4000, "RiskAssessmentService_looking_down_severe_duration_threshold_ms": 2990, "RiskAssessmentService_looking_down_severe_enable_debug_audio": false, "RiskAssessmentService_looking_down_severe_media_lockout_ms": 0, "RiskAssessmentService_looking_down_severe_media_profile": "VIDEO_SHORT", "RiskAssessmentService_looking_down_severe_upload_media_when_atypical": true, "RiskAssessmentService_looking_down_severity": "MEDIUM", "RiskAssessmentService_looking_down_should_play_rta": false, "RiskAssessmentService_looking_down_should_upload_media_when_no_alerts": false, "RiskAssessmentService_looking_down_speed_ge_threshold_miph": 5.0, "RiskAssessmentService_max_speed_backend_flags": -1, "RiskAssessmentService_max_speed_enable_debug_audio": true, "RiskAssessmentService_max_speed_enabled": true, "RiskAssessmentService_max_speed_end_below_s": 1.0, "RiskAssessmentService_max_speed_is_customer_facing": false, "RiskAssessmentService_max_speed_media_lockout_ms": -1, "RiskAssessmentService_max_speed_media_profile": "NO_MEDIA", "RiskAssessmentService_max_speed_rta_initial_alert_ms": 0, "RiskAssessmentService_max_speed_rta_repeat_interval_ms": 10000, "RiskAssessmentService_max_speed_rta_repeat_until_ms": -1, "RiskAssessmentService_max_speed_severity": "LOW", "RiskAssessmentService_max_speed_should_play_rta": false, "RiskAssessmentService_max_speed_should_upload_media_when_no_alerts": false, "RiskAssessmentService_max_speed_speed_limit_miph": 80.0, "RiskAssessmentService_max_speed_start_above_s": 3.0, "RiskAssessmentService_max_speed_upload_media_when_atypical": false, "RiskAssessmentService_no_seat_belt_backend_flags": -1, "RiskAssessmentService_no_seat_belt_continuous_alert_enabled": false, "RiskAssessmentService_no_seat_belt_continuous_alert_interval_ms": 15000, "RiskAssessmentService_no_seat_belt_distraction_ge_threshold_s": 10.0, "RiskAssessmentService_no_seat_belt_enable_debug_audio": true, "RiskAssessmentService_no_seat_belt_enabled": true, "RiskAssessmentService_no_seat_belt_is_customer_facing": false, "RiskAssessmentService_no_seat_belt_media_lockout_ms": -1, "RiskAssessmentService_no_seat_belt_media_profile": "SENSOR_ONLY", "RiskAssessmentService_no_seat_belt_rta_final_alert_ms": 30000, "RiskAssessmentService_no_seat_belt_rta_initial_alert_ms": 0, "RiskAssessmentService_no_seat_belt_rta_second_alert_ms": 10000, "RiskAssessmentService_no_seat_belt_severity": "LOW", "RiskAssessmentService_no_seat_belt_should_play_rta": false, "RiskAssessmentService_no_seat_belt_should_upload_media_when_no_alerts": false, "RiskAssessmentService_no_seat_belt_speed_ge_threshold_miph": 5.0, "RiskAssessmentService_no_seat_belt_upload_media_when_atypical": false, "RiskAssessmentService_obstructed_backend_flags": -1, "RiskAssessmentService_obstructed_distraction_ge_threshold_s": 60.0, "RiskAssessmentService_obstructed_enable_debug_audio": true, "RiskAssessmentService_obstructed_enabled": true, "RiskAssessmentService_obstructed_is_customer_facing": false, "RiskAssessmentService_obstructed_media_lockout_ms": -1, "RiskAssessmentService_obstructed_media_profile": "SENSOR_ONLY", "RiskAssessmentService_obstructed_rta_lockout_ms": 600000, "RiskAssessmentService_obstructed_rta_repeat_interval_ms": 15000, "RiskAssessmentService_obstructed_severity": "LOW", "RiskAssessmentService_obstructed_should_play_rta": false, "RiskAssessmentService_obstructed_should_upload_media_when_no_alerts": false, "RiskAssessmentService_obstructed_solar_position_alert_filter_enabled": false, "RiskAssessmentService_obstructed_speed_ge_threshold_miph": 5.0, "RiskAssessmentService_obstructed_sunrise_sunset_alert_filter_enabled": false, "RiskAssessmentService_obstructed_upload_media_when_atypical": false, "RiskAssessmentService_pcw_backend_flags": -1, "RiskAssessmentService_pcw_distraction_backend_flags": -1, "RiskAssessmentService_pcw_distraction_distraction_ge_threshold_s": 1.0, "RiskAssessmentService_pcw_distraction_enable_debug_audio": false, "RiskAssessmentService_pcw_distraction_enabled": true, "RiskAssessmentService_pcw_distraction_is_customer_facing": false, "RiskAssessmentService_pcw_distraction_media_lockout_ms": -1, "RiskAssessmentService_pcw_distraction_media_profile": "VIDEO_MEDIUM", "RiskAssessmentService_pcw_distraction_rta_initial_alert_ms": 0, "RiskAssessmentService_pcw_distraction_rta_repeat_interval_ms": 1000, "RiskAssessmentService_pcw_distraction_rta_repeat_until_ms": 3000, "RiskAssessmentService_pcw_distraction_severity": "CRITICAL", "RiskAssessmentService_pcw_distraction_should_play_rta": false, "RiskAssessmentService_pcw_distraction_should_upload_media_when_no_alerts": false, "RiskAssessmentService_pcw_distraction_speed_ge_threshold_miph": 5.0, "RiskAssessmentService_pcw_distraction_suppression_mode": "WHILE_ACTIVE", "RiskAssessmentService_pcw_distraction_ttc_le_threshold_s": 2.75, "RiskAssessmentService_pcw_distraction_upload_media_when_atypical": true, "RiskAssessmentService_pcw_enable_debug_audio": false, "RiskAssessmentService_pcw_enabled": true, "RiskAssessmentService_pcw_is_customer_facing": false, "RiskAssessmentService_pcw_media_lockout_ms": -1, "RiskAssessmentService_pcw_media_profile": "VIDEO_MEDIUM", "RiskAssessmentService_pcw_rta_initial_alert_ms": 0, "RiskAssessmentService_pcw_rta_repeat_interval_ms": 1000, "RiskAssessmentService_pcw_rta_repeat_until_ms": 3000, "RiskAssessmentService_pcw_severity": "CRITICAL", "RiskAssessmentService_pcw_should_play_rta": false, "RiskAssessmentService_pcw_should_upload_media_when_no_alerts": false, "RiskAssessmentService_pcw_speed_ge_threshold_miph": 15.0, "RiskAssessmentService_pcw_split_iva_sounds": false, "RiskAssessmentService_pcw_suppression_mode": "REMAINING", "RiskAssessmentService_pcw_ttc_le_threshold_s": 2.0, "RiskAssessmentService_pcw_upload_media_when_atypical": true, "RiskAssessmentService_post_facto_stop_sign_rolling_stop_backend_flags": -1, "RiskAssessmentService_post_facto_stop_sign_rolling_stop_enable_debug_audio": true, "RiskAssessmentService_post_facto_stop_sign_rolling_stop_enabled": true, "RiskAssessmentService_post_facto_stop_sign_rolling_stop_is_customer_facing": false, "RiskAssessmentService_post_facto_stop_sign_rolling_stop_media_lockout_ms": -1, "RiskAssessmentService_post_facto_stop_sign_rolling_stop_media_profile": "VIDEO_MEDIUM", "RiskAssessmentService_post_facto_stop_sign_rolling_stop_severity": "MEDIUM", "RiskAssessmentService_post_facto_stop_sign_rolling_stop_should_play_rta": false, "RiskAssessmentService_post_facto_stop_sign_rolling_stop_should_upload_media_when_no_alerts": false, "RiskAssessmentService_post_facto_stop_sign_rolling_stop_upload_media_when_atypical": true, "RiskAssessmentService_post_facto_stop_sign_violation_backend_flags": -1, "RiskAssessmentService_post_facto_stop_sign_violation_enable_debug_audio": true, "RiskAssessmentService_post_facto_stop_sign_violation_enabled": true, "RiskAssessmentService_post_facto_stop_sign_violation_is_customer_facing": false, "RiskAssessmentService_post_facto_stop_sign_violation_media_lockout_ms": -1, "RiskAssessmentService_post_facto_stop_sign_violation_media_profile": "VIDEO_MEDIUM", "RiskAssessmentService_post_facto_stop_sign_violation_severity": "MEDIUM", "RiskAssessmentService_post_facto_stop_sign_violation_should_play_rta": false, "RiskAssessmentService_post_facto_stop_sign_violation_should_upload_media_when_no_alerts": false, "RiskAssessmentService_post_facto_stop_sign_violation_upload_media_when_atypical": true, "RiskAssessmentService_posted_speed_backend_flags": -1, "RiskAssessmentService_posted_speed_continuous_alert_enabled": false, "RiskAssessmentService_posted_speed_continuous_alert_interval_ms": 15000, "RiskAssessmentService_posted_speed_enable_debug_audio": true, "RiskAssessmentService_posted_speed_enabled": false, "RiskAssessmentService_posted_speed_end_below_s": 1.0, "RiskAssessmentService_posted_speed_is_customer_facing": false, "RiskAssessmentService_posted_speed_media_lockout_ms": -1, "RiskAssessmentService_posted_speed_media_profile": "SNAPSHOTS_LONG", "RiskAssessmentService_posted_speed_rta_final_alert_ms": 30000, "RiskAssessmentService_posted_speed_rta_initial_alert_ms": 0, "RiskAssessmentService_posted_speed_rta_second_alert_ms": 10000, "RiskAssessmentService_posted_speed_severity": "LOW", "RiskAssessmentService_posted_speed_should_play_rta": false, "RiskAssessmentService_posted_speed_should_upload_media_when_no_alerts": false, "RiskAssessmentService_posted_speed_start_above_s": 5.0, "RiskAssessmentService_posted_speed_upload_media_when_atypical": true, "RiskAssessmentService_red_light_backend_flags": -1, "RiskAssessmentService_red_light_debug_mode": false, "RiskAssessmentService_red_light_delta_distance_threshold_m": 0.0, "RiskAssessmentService_red_light_distraction_backend_flags": -1, "RiskAssessmentService_red_light_distraction_debug_mode": false, "RiskAssessmentService_red_light_distraction_delta_distance_threshold_m": 0.0, "RiskAssessmentService_red_light_distraction_distraction_ge_threshold_s": 1.0, "RiskAssessmentService_red_light_distraction_enable_debug_audio": true, "RiskAssessmentService_red_light_distraction_enabled": true, "RiskAssessmentService_red_light_distraction_is_customer_facing": false, "RiskAssessmentService_red_light_distraction_media_lockout_ms": -1, "RiskAssessmentService_red_light_distraction_media_profile": "VIDEO_MEDIUM", "RiskAssessmentService_red_light_distraction_severity": "CRITICAL", "RiskAssessmentService_red_light_distraction_should_play_rta": false, "RiskAssessmentService_red_light_distraction_should_upload_media_when_no_alerts": false, "RiskAssessmentService_red_light_distraction_signal_memory_s": 0.0, "RiskAssessmentService_red_light_distraction_speed_ge_threshold_miph": 5.0, "RiskAssessmentService_red_light_distraction_upload_media_when_atypical": true, "RiskAssessmentService_red_light_enable_debug_audio": true, "RiskAssessmentService_red_light_enabled": true, "RiskAssessmentService_red_light_is_customer_facing": false, "RiskAssessmentService_red_light_media_lockout_ms": -1, "RiskAssessmentService_red_light_media_profile": "VIDEO_MEDIUM", "RiskAssessmentService_red_light_severity": "HIGH", "RiskAssessmentService_red_light_should_play_rta": false, "RiskAssessmentService_red_light_should_upload_media_when_no_alerts": false, "RiskAssessmentService_red_light_signal_memory_s": 0.0, "RiskAssessmentService_red_light_speed_ge_threshold_miph": 5.0, "RiskAssessmentService_red_light_upload_media_when_atypical": true, "RiskAssessmentService_smoking_backend_flags": -1, "RiskAssessmentService_smoking_duration_ge_threshold_s": 5.0, "RiskAssessmentService_smoking_enable_debug_audio": true, "RiskAssessmentService_smoking_enabled": true, "RiskAssessmentService_smoking_is_customer_facing": false, "RiskAssessmentService_smoking_media_lockout_ms": 600000, "RiskAssessmentService_smoking_media_profile": "SENSOR_ONLY", "RiskAssessmentService_smoking_rta_lockout_ms": 600000, "RiskAssessmentService_smoking_rta_repeat_interval_ms": 60001, "RiskAssessmentService_smoking_severity": "LOW", "RiskAssessmentService_smoking_should_play_rta": false, "RiskAssessmentService_smoking_should_upload_media_when_no_alerts": false, "RiskAssessmentService_smoking_upload_media_when_atypical": false, "RiskAssessmentService_stop_sign_backend_flags": -1, "RiskAssessmentService_stop_sign_delta_distance_threshold_m": 0.0, "RiskAssessmentService_stop_sign_distraction_backend_flags": -1, "RiskAssessmentService_stop_sign_distraction_delta_distance_threshold_m": 0.0, "RiskAssessmentService_stop_sign_distraction_distraction_ge_threshold_s": 1.0, "RiskAssessmentService_stop_sign_distraction_enable_debug_audio": true, "RiskAssessmentService_stop_sign_distraction_enabled": true, "RiskAssessmentService_stop_sign_distraction_is_customer_facing": false, "RiskAssessmentService_stop_sign_distraction_media_lockout_ms": -1, "RiskAssessmentService_stop_sign_distraction_media_profile": "VIDEO_MEDIUM", "RiskAssessmentService_stop_sign_distraction_severity": "CRITICAL", "RiskAssessmentService_stop_sign_distraction_should_play_rta": false, "RiskAssessmentService_stop_sign_distraction_should_upload_media_when_no_alerts": false, "RiskAssessmentService_stop_sign_distraction_signal_memory_s": 0.0, "RiskAssessmentService_stop_sign_distraction_speed_ge_threshold_miph": 5.0, "RiskAssessmentService_stop_sign_distraction_upload_media_when_atypical": true, "RiskAssessmentService_stop_sign_enable_debug_audio": true, "RiskAssessmentService_stop_sign_enabled": true, "RiskAssessmentService_stop_sign_is_customer_facing": false, "RiskAssessmentService_stop_sign_media_lockout_ms": -1, "RiskAssessmentService_stop_sign_media_profile": "VIDEO_MEDIUM", "RiskAssessmentService_stop_sign_severity": "HIGH", "RiskAssessmentService_stop_sign_should_play_rta": false, "RiskAssessmentService_stop_sign_should_upload_media_when_no_alerts": false, "RiskAssessmentService_stop_sign_signal_memory_s": 0.0, "RiskAssessmentService_stop_sign_speed_ge_threshold_miph": 5.0, "RiskAssessmentService_stop_sign_upload_media_when_atypical": true, "RiskAssessmentService_tg_backend_flags": -1, "RiskAssessmentService_tg_distraction_backend_flags": -1, "RiskAssessmentService_tg_distraction_distraction_ge_threshold_s": 1.0, "RiskAssessmentService_tg_distraction_duration_ge_threshold_s": 3.0, "RiskAssessmentService_tg_distraction_enable_debug_audio": false, "RiskAssessmentService_tg_distraction_enabled": false, "RiskAssessmentService_tg_distraction_is_customer_facing": false, "RiskAssessmentService_tg_distraction_media_lockout_ms": -1, "RiskAssessmentService_tg_distraction_media_profile": "SNAPSHOTS_LONG", "RiskAssessmentService_tg_distraction_rta_initial_alert_ms": 0, "RiskAssessmentService_tg_distraction_rta_repeat_interval_ms": 3000, "RiskAssessmentService_tg_distraction_rta_repeat_until_ms": 3000, "RiskAssessmentService_tg_distraction_severity": "HIGH", "RiskAssessmentService_tg_distraction_should_play_rta": false, "RiskAssessmentService_tg_distraction_should_upload_media_when_no_alerts": false, "RiskAssessmentService_tg_distraction_speed_ge_threshold_miph": 5.0, "RiskAssessmentService_tg_distraction_suppression_mode": "WHILE_ACTIVE", "RiskAssessmentService_tg_distraction_tth_le_threshold_s": 1.5, "RiskAssessmentService_tg_distraction_upload_media_when_atypical": true, "RiskAssessmentService_tg_duration_ge_threshold_s": 6.0, "RiskAssessmentService_tg_enable_debug_audio": false, "RiskAssessmentService_tg_enabled": false, "RiskAssessmentService_tg_is_customer_facing": false, "RiskAssessmentService_tg_media_lockout_ms": -1, "RiskAssessmentService_tg_media_profile": "SNAPSHOTS_LONG", "RiskAssessmentService_tg_rta_initial_alert_ms": 0, "RiskAssessmentService_tg_rta_repeat_interval_ms": 6000, "RiskAssessmentService_tg_rta_repeat_until_ms": 6000, "RiskAssessmentService_tg_severity": "MEDIUM", "RiskAssessmentService_tg_should_play_rta": false, "RiskAssessmentService_tg_should_upload_media_when_no_alerts": false, "RiskAssessmentService_tg_speed_ge_threshold_miph": 25.0, "RiskAssessmentService_tg_suppression_mode": "REMAINING", "RiskAssessmentService_tg_tth_le_threshold_s": 1.0, "RiskAssessmentService_tg_upload_media_when_atypical": true, "RiskAssessmentService_weather_info_expiration_ms": 3600000, "SdCardEncryptionManager_number_of_reboot_before_remove_oem_key": 5, "SdCardEncryptionManager_remove_oem_key_enabled": true, "SensorRecorder_maximum_files": 12000, "SensorRecorder_record_auto_calibration": true, "SensorRecorder_record_braking_distance": true, "SensorRecorder_record_centerline_polygon": true, "SensorRecorder_record_combo_event": true, "SensorRecorder_record_crashnet": true, "SensorRecorder_record_crashnet_shadow": true, "SensorRecorder_record_distraction": true, "SensorRecorder_record_distraction_algorithm_events": true, "SensorRecorder_record_drowsiness": true, "SensorRecorder_record_fcw": true, "SensorRecorder_record_gps": true, "SensorRecorder_record_ignition_state": true, "SensorRecorder_record_maneuver_output_event_data": true, "SensorRecorder_record_mcod_bounding_boxes": true, "SensorRecorder_record_model_versions": true, "SensorRecorder_record_nautort_accel": true, "SensorRecorder_record_nautort_device_orientation_data": true, "SensorRecorder_record_nautort_face_info": true, "SensorRecorder_record_nautort_gyroscope": true, "SensorRecorder_record_nautort_luminance_info": true, "SensorRecorder_record_nautort_oriented_sensor_data": true, "SensorRecorder_record_nautort_speed": true, "SensorRecorder_record_obd_info_data": true, "SensorRecorder_record_omnifusion_complete_state": true, "SensorRecorder_record_omnifusion_location": true, "SensorRecorder_record_omnifusion_state": false, "SensorRecorder_record_omnifusion_state_matrix": true, "SensorRecorder_record_omnifusion_vehicle_dynamics": true, "SensorRecorder_record_pcw": true, "SensorRecorder_record_post_facto_stop_sign": true, "SensorRecorder_record_risk_assessment_data": true, "SensorRecorder_record_road_info": true, "SensorRecorder_record_tailgating": true, "SensorRecorder_record_temperature": true, "SensorRecorder_record_visual_traffic_condition": true, "SensorRecorder_record_weather_info": true, "SensorRecorder_recording_period": 10000, "ServerModule_auto_clear_sd_card_data_on_fleet_change": false, "ServerModule_rework_fleet_name": "x-rework", "SmartIrledServiceModule_algorithm": 0, "SmartIrledServiceModule_default_sunrise_time_min": 420, "SmartIrledServiceModule_default_sunset_time_min": 1140, "SmartIrledServiceModule_enable_ir_cut_filter_health_monitor": false, "SmartIrledServiceModule_enabled": true, "SmartIrledServiceModule_indicator_led_control": 1, "SmartIrledServiceModule_ir_cut_filter_health_monitor_interval_ms": 10000, "SmartIrledServiceModule_ir_cut_filter_health_monitor_luminance_offset": 20, "SmartIrledServiceModule_irled_off_interval_ms": 300000, "SmartIrledServiceModule_irled_off_interval_ms_multiplier": 2, "SmartIrledServiceModule_irled_section_offset": 0, "SmartIrledServiceModule_luminance_check_interval_ms": 1500, "SmartIrledServiceModule_saturation_check_interval_ms": 1000, "SmartIrledServiceModule_saturation_limit": 198, "SmartIrledServiceModule_section_change_interval_ms": 132, "SmartIrledServiceModule_sunrise_time_offset_min": 0, "SmartIrledServiceModule_sunset_time_offset_min": 0, "SmartIrledServiceModule_target_luminance_lower_bound": 58, "SmartIrledServiceModule_target_luminance_upper_bound": 98, "SmokingDetector2_duration_threshold_ms": 10000, "SmokingDetector2_enable": true, "SmokingDetector2_high_risk_enable_debug_audio": true, "SmokingDetector2_high_risk_media_lockout_ms": 600000, "SmokingDetector2_high_risk_media_profile": "SNAPSHOTS", "SmokingDetector2_high_risk_upload_media_when_atypical": true, "SmokingDetector2_score_threshold": 0.7, "SpeedProvider_basic_timestamp_limit": 0, "SpeedRealTimeAlertModule_alert_interval_ms": 3000, "SpeedRealTimeAlertModule_first_alert_delay_ms": 3000, "SpeedRealTimeAlertModule_max_speed": 0, "SpeedRealTimeAlertModule_old_data_time_ms": 2000, "SpeedingDetectionService_enabled": true, "SpeedingDetectionService_end_below_gt_ms": 1000, "SpeedingDetectionService_gps_timeout_ns": 1500000000, "SpeedingDetectionService_high_band_min_overage_speed_mph": 15.0, "SpeedingDetectionService_high_band_severity": 3, "SpeedingDetectionService_imu_timeout_ns": 1000000000, "SpeedingDetectionService_low_band_min_overage_speed_mph": 5.0, "SpeedingDetectionService_low_band_severity": 1, "SpeedingDetectionService_median_provider_size": 3, "SpeedingDetectionService_medium_band_min_overage_speed_mph": 10.0, "SpeedingDetectionService_medium_band_severity": 2, "SpeedingDetectionService_refer_raw_gps": true, "StmBridgeModule_battery_monitor_interval_ms": 1000, "StmBridgeModule_block_uart_communications_after_resume_ms": 2000, "StmBridgeModule_enabled": false, "StmBridgeModule_low_battery_level_check_enabled": false, "StmBridgeModule_low_battery_level_look_back_s": 60, "StmBridgeModule_low_battery_level_voltage_threshold_v": 11.4, "StmBridgeModule_min_interval_between_stm_uart_send_ms": 125, "StmBridgeModule_send_power_consumption_data": false, "StmBridgeModule_woi_ack_timeout_s": 1, "StmBridgeModule_woi_enabled": false, "StmWatchdog_ap_boot_time_ms": 600000, "StmWatchdog_enable": true, "StmWatchdog_interval_multiplier": 3, "StmWatchdog_max_waiting_time_for_watchdog_config_before_sleep_ms": 10000, "StmWatchdog_power_off_interval_ms": 60000, "StmWatchdog_reboot_interval_ms": 600000, "StmWatchdog_retry_count": 3, "StmWatchdog_system_off_interval_ms": 60000, "StmWatchdog_wakeup_interval_ms": 600000, "TailgatingData_upload_video": false, "TailgatingModule_calibration_parameters": "[0.5, 0.5, 0.57, 0.95, 0.43, 0.95]", "TailgatingModule_default_version": 6, "TailgatingModule_default_version_night": 1, "TailgatingModule_minimum_day_version": 2, "TailgatingModule_minimum_night_version": 0, "TailgatingModule_play_real_time_alerts": false, "TailgatingModule_play_real_time_alerts_night": false, "TailgatingModule_real_time_alert_lockout": 5000, "TailgatingService_aspect_ratio_threshold": 0.7, "TailgatingService_buffer_length": 4, "TailgatingService_buffer_min_nonzero_elements": 1, "TailgatingService_degradation_threshold": 4.0, "TailgatingService_display_frames_interval": 8, "TailgatingService_enable_vehicle_not_turning_check": false, "TailgatingService_enabled": false, "TailgatingService_kappa_large_vehicle": 3300.0, "TailgatingService_kappa_small_vehicle": 2250.0, "TailgatingService_leading_vehicle_algorithm_version": "TRIANGLE", "TailgatingService_maximum_tailgating_duration_ms": 18000, "TailgatingService_minimum_distance_speed_band_1_m": 25.0, "TailgatingService_minimum_distance_speed_band_2_m": 25.0, "TailgatingService_minimum_distance_speed_band_3_m": 25.0, "TailgatingService_minimum_speed_1_miph": 25.0, "TailgatingService_minimum_speed_2_miph": 45.0, "TailgatingService_minimum_speed_3_miph": 60.0, "TailgatingService_minimum_tailgating_duration_ms": 4000, "TailgatingService_minimum_tailgating_event_gap_ms": 10000, "TailgatingService_night_threshold": 0.95, "TailgatingService_output_enable_debug_audio": false, "TailgatingService_output_media_lockout_ms": 180000, "TailgatingService_output_media_profile": "SNAPSHOTS", "TailgatingService_output_upload_media_when_atypical": true, "TailgatingService_ratio_intersection_threshold": 0.5, "TailgatingService_score_threshold_band_1": 1.0, "TailgatingService_score_threshold_band_2": 1.0, "TailgatingService_score_threshold_band_3": 1.0, "TailgatingService_vehicle_maximum_left_turn_radius_m": 50.0, "TailgatingService_vehicle_maximum_right_turn_radius_m": 50.0, "TemperatureModule_end_computation_range_temp_c": 80.0, "TemperatureModule_read_temprature_interval_ms": 1000, "TemperatureModule_start_computation_range_temp_c": 20.0, "UploadRunnable_high_batch_size": 1, "UploadRunnable_high_max_queue_length": 2000, "UploadRunnable_highest_batch_size": 1, "UploadRunnable_highest_max_queue_length": 2000, "UploadRunnable_low_batch_size": 1, "UploadRunnable_low_max_queue_length": 2000, "UploadRunnable_max_file_size": 262144000, "UploadRunnable_mobile_data_quiet_depth": 1, "UploadRunnable_normal_batch_size": 1, "UploadRunnable_normal_max_queue_length": 2000, "UploadRunnable_send_file_upload_status_failure": false, "UsbMediaAccess_mode": 2, "VehicleInfo_profile": 0, "VehicleStateModule_max_rpm_sample_age_s": 30, "VehicleStateModule_max_wait_to_sleep_alarm": 180000, "VehicleStateModule_max_wait_to_sleep_motion": 600000, "VehicleStateModule_max_wait_to_sleep_ota": 600000, "VehicleStateModule_message_pb_queue_sleep_threshold": 0, "VehicleStateModule_message_queue_sleep_threshold": 0, "VehicleStateModule_network_disconnected_sleep_threshold": 300000, "VehicleStateModule_no_imu_fatal_reboot_s": 120, "VehicleStateModule_park_delay": 300000, "VehicleStateModule_park_delay_after_reboot_ms": 90000, "VehicleStateModule_sleep_delay": 60000, "VehicleStateModule_upload_queue_sleep_threshold": 0, "VehicleStateModule_wait_for_engine_off_before_sleeping": false, "VehicleStateService_braking_distance_attentive_reaction_time_sec": 1.0, "VehicleStateService_braking_distance_distracted_reaction_time_sec": 2.0, "VehicleStateService_braking_distance_enabled": true, "VehicleStateService_braking_distance_prefiliter_time_constant": 0.2, "VehicleStateService_braking_distance_safe_min_acc_ms2": -4.0, "VehicleStateService_braking_distance_source_timestamp_mismatch_limit_ms": 500, "VehicleStateService_enabled": true, "VehicleStateService_speed_provider_data_expire_ms": 1500, "VehicleStateService_speed_provider_data_lock_out_ms": 0, "VehicleStateService_speed_provider_enabled": true, "VehicleStateService_speed_provider_median_provider_window_size": 3, "VehicleStateService_speed_provider_refer_raw_gps": true, "VisualTrafficConditionService_consecutive_frame_num": 3, "VisualTrafficConditionService_distance_lower_bound_m": 3.0, "VisualTrafficConditionService_distance_upper_bound_m": 30.0, "VisualTrafficConditionService_enabled": true, "VisualTrafficConditionService_estimation_kappa": 2250.0, "VisualTrafficConditionService_green_light_last_n_frames": 0, "VisualTrafficConditionService_output_enable_debug_audio": true, "VisualTrafficConditionService_output_media_lockout_ms": -1, "VisualTrafficConditionService_output_media_profile": "NO_MEDIA", "VisualTrafficConditionService_output_upload_media_when_atypical": true, "VisualTrafficConditionService_red_light_last_n_frames": 0, "VisualTrafficConditionService_stop_sign_last_n_frames": 0, "VisualTrafficConditionService_yellow_light_last_n_frames": 0, "WatchdogCommunicationMonitor_begin_reboot_hour": 2, "WatchdogCommunicationMonitor_data_usage_billing_cycle_start": 1, "WatchdogCommunicationMonitor_day_of_week_to_extend_log_and_reporting_frequency": "1,7", "WatchdogCommunicationMonitor_day_of_week_to_extend_log_and_reporting_frequency_multiplier": 3, "WatchdogCommunicationMonitor_dynamic_reports_algorithm_frequency_dec_sleeping": 7200000, "WatchdogCommunicationMonitor_dynamic_reports_algorithm_parked_time_threshold_sleeping": 7200000, "WatchdogCommunicationMonitor_enable_maneuner_subscriber_restart_moving_stop_on_too_old": true, "WatchdogCommunicationMonitor_enable_maneuver_restart_on_last_stop_message_too_old": true, "WatchdogCommunicationMonitor_enable_moving_stop_reboot_on_too_many_restart": true, "WatchdogCommunicationMonitor_enable_moving_stop_restart_on_too_old": true, "WatchdogCommunicationMonitor_enable_reboot_on_old_queue_length_update": true, "WatchdogCommunicationMonitor_end_reboot_hour": 4, "WatchdogCommunicationMonitor_fan_control_enabled": true, "WatchdogCommunicationMonitor_log_frequency_max_sleeping": 36000000, "WatchdogCommunicationMonitor_log_frequency_running": 60000, "WatchdogCommunicationMonitor_log_frequency_sleeping": 3600000, "WatchdogCommunicationMonitor_max_heartbeat_age": 5000, "WatchdogCommunicationMonitor_max_moving_stop_message_age_ms": 50000, "WatchdogCommunicationMonitor_max_stop_message_age_ms": 28800000, "WatchdogCommunicationMonitor_max_time_without_new_location_ms": 300000, "WatchdogCommunicationMonitor_max_time_without_successful_http_call_ms": 900000, "WatchdogCommunicationMonitor_min_time_modem_on_before_reboot_ms": 300000, "WatchdogCommunicationMonitor_modem_power_cycle_time_ms": 5000, "WatchdogCommunicationMonitor_nr_of_modem_power_cycles_before_reboot": 8, "WatchdogCommunicationMonitor_queue_length_update_frequency": 15000, "WatchdogCommunicationMonitor_queue_length_update_wait_multiplier": 10, "WatchdogCommunicationMonitor_queue_length_update_wait_since_boot_ms": 300000, "WatchdogCommunicationMonitor_reboot_after_max_number_of_vsm_restart_in_interval": 3, "WatchdogCommunicationMonitor_reboot_after_max_vsm_restart_seen_in_interval_ms": 600000, "WatchdogCommunicationMonitor_reboot_on_http_failures_when_modem_is_on": true, "WatchdogCommunicationMonitor_reboot_period": 43200000, "WatchdogCommunicationMonitor_reboot_periodically": true, "WatchdogCommunicationMonitor_report_summary": true, "WatchdogCommunicationMonitor_report_warning_messages": true, "WatchdogCommunicationMonitor_reports_algorithm_type_sleeping": "static", "WatchdogCommunicationMonitor_server_reporting_frequency_running": 60000, "WatchdogCommunicationMonitor_server_reporting_frequency_sleeping": 3600000, "WatchdogCommunicationMonitor_server_reporting_max_frequency_sleeping": 36000000, "WatchdogCommunicationMonitor_time_between_consecutive_modem_recovery_attempts_ms": 600000, "WatchdogCommunicationMonitor_trigger_range_running": 10000, "WatchdogCommunicationMonitor_trigger_range_sleeping": 360000, "WatchdogCommunicationMonitor_watchdog_service_on": true, "WatchdogService_min_module_service_reboot_threshold": 600000, "WatchdogWarningThresholds_high_cpu_temperature_warning": 90.0, "WatchdogWarningThresholds_high_message_pb_queue_count_warning_threshold": 200, "WatchdogWarningThresholds_high_message_queue_count_warning_threshold": 200, "WatchdogWarningThresholds_high_upload_queue_count_warning_threshold": 50, "WatchdogWarningThresholds_low_storage_warning_external": 0.99, "WatchdogWarningThresholds_low_storage_warning_internal": 0.9, "WeatherService_api_key": "", "WeatherService_core_app_enabled": true, "WeatherService_enabled": false, "WeatherService_production_url": "https://weather.cc.api.here.com", "WeatherService_retrieval_interval_ms": 14400000, "WeatherService_retry_interval_ms": 60000, "WifiApConnectivityModule_enabled": true, "WifiApConnectivityModule_scan_interval_ms": 10000, "WifiApModule_enabled": false, "WifiApModule_password": "123456789", "WifiApModule_ssid": "Nauto AP Test"}',
  );

  console.log("DisplayConfig started");

  waitForKeyElements("tbody[id^='mergedreview_edit_config_result_wrap']", zapHiddenReplies, false);

  function zapHiddenReplies(jNode) {
    var b = document.getElementById("myButton");
    b.removeAttribute("hidden");
  }

  /**
   * To use:
   *  + (isDefault(min_level) ? "<sup>d</sup>": "")
   *
   */
  function isDefault(keyvalue) {
    return keyvalue["source"] == "default";
  }

  function getPage(config) {
    var str = "<head><style>.switchover {font-weight: bold; display: inline; color: orange} .switchon {font-weight: bold; display: inline; color: green} .switchoff {font-weight: bold; display: inline; color: red} .c1 {border: 0px solid green} table {border: 1px solid black;border-collapse: collapse;}th {background: #cccccc; padding: 10px;text-align: center; } td {padding: 10px;text-align: left}</style></style></head>";
    str += '<table class="c1"><tr><td>' + getIVAInfo(config) + "</td><td>" + getTMX(config) + "</td><td>" + getAudio(config) + "</td></tr><tr><td>" + getMark(config) + "</td><td>" + getDriverID(config) + "</td><td>" + getUploadPolicy(config) + '</td></tr><tr><td colspan="3">' + getShutdownDelays(config) + "</td></tr></table>";
    str += '<table class="c1"><tr><td>' + getSeatBelt(config) + "</td><td>" + getObstruction(config) + "</td></tr></table>";
    str += '<table class="c1"><tr><td>' + getDistractions(config) + "</td><td>" + getCellPhone(config) + "</td></tr><tr><td>" + getSmoking(config) + "</td><td>" + getDrowsiness(config) + "</td></tr></table>";
    str += '<table class="c1"><tr><td>' + getTailgating(config) + "</td><td>" + getTailgatingPlusD(config) + "</td></tr></table>";
    str += '<table class="c1"><tr><td>' + getPCW(config) + "</td><td>" + getPCWPlusD(config) + "</td></tr><tr><td>" + getFCW(config) + "</td><td>" + getFCWPlusD(config) + "</td></tr></table>";
    str += '<table class="c1"><tr><td>' + getAcceleration(config) + "</td><td>" + getBraking(config) + "</td><td>" + getCornering(config) + '</td></tr><tr><td colspan="3">' + getPostedSpeeding(config) + "</td></tr></table>";
    return str;
  }

  function printBits(val, options) {
    var retStr = '<table  class="c1" style="display:inline">';

    if (val == -1) {
      retStr += "<tr><td>Not set</td></tr>";
    } else {
      if (val % 2 == 1) retStr += "<tr><td>" + options[0] + "</td></tr>";
      else retStr += "<tr><td>Do not " + options[0] + "</td></tr>";

      if (Math.floor(val / 2) % 2 == 1) retStr += "<tr><td>" + options[1] + "</td></tr>";
      else retStr += "<tr><td>Do not " + options[1] + "</td></tr>";

      if (Math.floor(val / 4) % 2 == 1) retStr += "<tr><td>" + options[2] + "</td></tr>";
      else retStr += "<tr><td>Do not " + options[2] + "</td></tr>";
    }
    retStr += "</table>";
    return retStr;
  }

  function printFlags(val) {
    return printBits(val, ["Show in fleet app", "Count in VERA", "Count in Event Counts"]);
  }

  function isIVAOff(config) {
    return getValue("EventAudioService_min_alert_level", config).value == 3;
  }

  function getIVAInfo(config) {
    var str = "<table><tr><th>In Vehicle Alert Mode is ";
    var min_level = getValue("EventAudioService_min_alert_level", config);

    if (min_level.value == 1) {
      str += '<div class="switchon">IN DEBUG MODE</div>';
    } else if (min_level.value == 2) {
      str += '<div class="switchon">NOT SUPPRESSED</div> (PREVENT)';
      // print("IVAs are turned ON " + ("(default)" if (min_level['source'] == 'default') else ""))
    } else if (min_level.value == 3) {
      str += '<div class="switchoff">SUPPRESSED</div> (BASELINE)';
      // print("IVAs are turned OFF " + ("(default)" if (min_level['source'] == 'default') else ""))
    }
    str += "</th></tr></table>";
    return str;
  }

  function getUploadPolicy(config) {
    var message = ['<div class="switchoff">not allowed</div>', '<div class="switchover">allowed for <b>outward</b> camera only</div>', '<div class="switchover">allowed for <b>inward</b> camera only</div>', '<div class="switchon">allowed for <b>both</b> cameras</div>'];
    var str = "<table><tr><th>Snapshot and Video Upload Policies</th></tr>";
    var cvr_snapshot = getValue("NautoApplication_downstream_snapshot_upload_policy", config);
    var cvr_video = getValue("NautoApplication_downstream_video_upload_policy", config);
    var event_snapshot = getValue("NautoApplication_event_snapshot_upload_policy", config);
    var event_video = getValue("NautoApplication_event_video_upload_policy", config);

    str += "<tr><td><table>";
    str += "<tr><td>CVR requested snapshots " + message[cvr_snapshot.value] + "</td></tr>";
    str += "<tr><td>CVR requested videos " + message[cvr_video.value] + "</td></tr>";
    str += "<tr><td>Event triggered snapshots " + message[event_snapshot.value] + "</td></tr>";
    str += "<tr><td>Event triggered videos " + message[event_video.value] + "</td></tr>";
    str += "</table></td></tr>";

    str += "</table>";
    return str;
  }

  function getTMX(config) {
    var str = "<table><tr><th>Telematics are ";

    var dongle = getValue("ObdDongleModule_enabled", config);
    var backend = getValue("ObdDongleModule_send_obd_to_backend", config);
    if (dongle.value == true) {
      if (dongle.value == true && backend.value == true) {
        str += '<div class="switchon">ON</div>';
      } else {
        str += '<div class="switchon">OBD Dongle Only ON</div>';
      }
    } else {
      str += '<div class="switchoff">OFF</div>';
    }
    str += "</th></tr></table>";
    return str;
  }

  function getShutdownDelays(config) {
    var str = '<table align="center"><tr><th>Device shutdown delays</th></tr>';

    var park = getValue("VehicleStateModule_park_delay", config);
    var sleep = getValue("VehicleStateModule_sleep_delay", config);
    str += "<tr><td><table>";
    str += "<tr><td>Delay from STOPPED to PARKED state is <b>" + msToTime(park.value) + "</b></td></tr>";
    str += "<tr><td>Delay from PARKED to SLEEP state is <b>" + msToTime(sleep.value) + "</b></td></tr>";
    str += "</th></tr></table>";
    str += "</table>";
    return str;
  }

  function getDriverID(config) {
    var str = "<table><tr><th>Driver ID is ";

    var service = getValue("CameraSchedulerModule_driver_id_snapshot_enabled", config);
    console.log("driver id service.value=" + service.value);
    if (service.value == false) {
      str += '<div class="switchoff">OFF</div></th></tr>';
    } else {
      str += '<div class="switchon">ON</div></th></tr>';
      str += "<tr><td><table>";
      var parked = getValue("CameraSchedulerModule_driver_id_upload_only_on_parked", config);
      if (parked.value == true) {
        str += '<tr><td>Upload ONLY when parked is <div class="switchon">ON</div></td></tr>';
      } else {
        str += '<tr><td>Upload ONLY when parked is <div class="switchoff">OFF</div></td></tr>';
      }
      str += "</table></td></tr>";
    }
    str += "</table>";
    return str;
  }

  function getMark(config) {
    var str = "<table border=1><tr><th>Mark Button is ";

    var service = getValue("HardwareMarkButtonModule_enabled", config);
    console.log("mark button service.value=" + service.value);
    if (service.value == false) {
      str += '<div class="switchoff">OFF</div></th></tr>';
    } else {
      str += '<div class="switchon">ON</div></th></tr>';
      str += "<tr><td><table>";
      var markBefore = getValue("HardwareMarkButtonModule_min_mark_video_before_event", config);
      var markAfter = getValue("HardwareMarkButtonModule_min_mark_video_after_event", config);
      str += "<tr><td>Mark button records <b>" + msToTime(markBefore.value) + "</b> before and <b>" + msToTime(markAfter.value) + "</b> after press</td></tr>";

      var panicBefore = getValue("HardwareMarkButtonModule_min_panic_video_before_event", config);
      var panicAfter = getValue("HardwareMarkButtonModule_min_panic_video_after_event", config);
      str += "<tr><td>Panic button records <b>" + msToTime(panicBefore.value) + "</b> before and <b>" + msToTime(panicAfter.value) + "</b> after press</td></tr>";
      str += "</table></td></tr>";
    }
    str += "</table>";
    return str;
  }

  function getAudio(config) {
    var str = "<table><tr><th>In cabin Audio is ";

    var service = getValue("InwardCameraService_audio_enabled", config);
    if (service.value == false) {
      str += '<div class="switchoff">OFF</div></th></tr>';
    } else {
      str += '<div class="switchon">ON</div></th></tr>';
    }
    str += "</table>";
    return str;
  }

  function getAcceleration(config) {
    var str = "<table><tr><th>Acceleration Detection is ";

    var service = getValue("ManeuverService_enable_accel_braking", config);
    var riskService = getValue("RiskAssessmentService_acceleration_enabled", config);
    console.log("Acceleration service.value=" + service.value);
    if (service.value == false || riskService.value == false) {
      str += '<div class="switchoff">OFF</div></th></tr>';
    } else {
      str += '<div class="switchon">ON</div>';
      var rta = getValue("RiskAssessmentService_acceleration_should_play_rta", config);
      str += " / Alerts ";
      if (rta.value == false) {
        str += '<div class="switchoff">OFF</div>';
      } else {
        if (isIVAOff(config)) str += '<div class="switchoff">OFF &uarr;</div>';
        else str += '<div class="switchon">ON</div>';
      }
      str += "</th></tr>";

      str += "<tr><td><table>";
      var cust = getValue("RiskAssessmentService_acceleration_is_customer_facing", config);
      var media = getValue("RiskAssessmentService_acceleration_media_profile", config);
      var backend = getValue("RiskAssessmentService_acceleration_backend_flags", config);

      str += "<tr><td>Customer facing is ";
      if (cust.value == false) {
        str += '<div class="switchoff">OFF</div></td></tr>';
      } else {
        str += '<div class="switchon">ON</div></td></tr>';
      }
      str += "<tr><td>Backend flags " + printFlags(backend.value) + "</td>";
      str += "<tr><td>Media Profile is " + media.value + "</td></tr>";
      str += "</table></td></tr>";
    }
    str += "</tr></table>";
    return str;
  }

  function getBraking(config) {
    var str = "<table border=1><tr><th>Braking Detection is ";

    var service = getValue("ManeuverService_enable_accel_braking", config);
    var riskService = getValue("RiskAssessmentService_braking_enabled", config);
    console.log("Acceleration service.value=" + service.value);
    if (service.value == false || riskService.value == false) {
      str += '<div class="switchoff">OFF</div>';
    } else {
      str += '<div class="switchon">ON</div>';
      var rta = getValue("RiskAssessmentService_braking_should_play_rta", config);
      str += " / Alerts ";
      if (rta.value == false) {
        str += '<div class="switchoff">OFF</div>';
      } else {
        if (isIVAOff(config)) str += '<div class="switchoff">OFF &uarr;</div>';
        else str += '<div class="switchon">ON</div>';
      }
      str += "</th></tr>";
      str += "<tr><td><table>";
      var cust = getValue("RiskAssessmentService_braking_is_customer_facing", config);
      var media = getValue("RiskAssessmentService_braking_media_profile", config);
      var backend = getValue("RiskAssessmentService_braking_backend_flags", config);

      str += "<tr><td>Customer facing is ";
      if (cust.value == false) {
        str += '<div class="switchoff">OFF</div></td></tr>';
      } else {
        str += '<div class="switchon">ON</div></td></tr>';
      }
      str += "<tr><td>Backend flags " + printFlags(backend.value) + "</td>";
      str += "<tr><td>Media Profile is " + media.value + "</td></tr>";
      str += "</table></td></tr>";
    }
    str += "</tr></table>";
    return str;
  }

  function getCornering(config) {
    var str = "<table><tr><th>Cornering Detection is ";

    var service = getValue("ManeuverService_enable_corner_left_right", config);
    var riskService = getValue("RiskAssessmentService_cornering_enabled", config);
    if (service.value == false || riskService.value == false) {
      str += '<div class="switchoff">OFF</div>';
    } else {
      str += '<div class="switchon">ON</div>';
      var rta = getValue("RiskAssessmentService_cornering_should_play_rta", config);
      str += " / Alerts ";
      if (rta.value == false) {
        str += '<div class="switchoff">OFF</div>';
      } else {
        if (isIVAOff(config)) str += '<div class="switchoff">OFF &uarr;</div>';
        else str += '<div class="switchon">ON</div>';
      }
      str += "</th></tr>";
      str += "<tr><td><table>";
      var cust = getValue("RiskAssessmentService_cornering_is_customer_facing", config);
      var media = getValue("RiskAssessmentService_cornering_media_profile", config);
      var backend = getValue("RiskAssessmentService_cornering_backend_flags", config);

      str += "<tr><td>Customer facing is ";
      if (cust.value == false) {
        str += '<div class="switchoff">OFF</div></td></tr>';
      } else {
        str += '<div class="switchon">ON</div></td></tr>';
      }
      str += "<tr><td>Backend flags " + printFlags(backend.value) + "</td>";
      str += "<tr><td>Media Profile is " + media.value + "</td></tr>";
      str += "</table></td></tr>";
    }
    str += "</tr></table>";
    return str;
  }

  function getPostedSpeeding(config) {
    var str = '<table align="center"><tr><th>Speeding Detection is ';

    var service = getValue("SpeedingDetectionService_enabled", config);
    var riskService = getValue("RiskAssessmentService_posted_speed_enabled", config);
    if (service.value == false || riskService.value == false) {
      str += '<div class="switchoff">OFF</div></th></tr>';
    } else {
      str += '<div class="switchon">ON</div>';
      var rta = getValue("RiskAssessmentService_posted_speed_should_play_rta", config);
      str += " / Alerts ";
      if (rta.value == false) {
        str += '<div class="switchoff">OFF</div>';
      } else {
        if (isIVAOff(config)) str += '<div class="switchoff">OFF &uarr;</div>';
        else str += '<div class="switchon">ON</div>';
      }
      str += "</th></tr>";

      str += "<tr><td><table>";
      var cust = getValue("RiskAssessmentService_posted_speed_is_customer_facing", config);
      var media = getValue("RiskAssessmentService_posted_speed_media_profile", config);
      var initial_delay = getValue("RiskAssessmentService_posted_speed_rta_initial_alert_ms", config);
      var low = getValue("SpeedingDetectionService_low_band_min_overage_speed_mph", config);
      var medium = getValue("SpeedingDetectionService_medium_band_min_overage_speed_mph", config);
      var high = getValue("SpeedingDetectionService_high_band_min_overage_speed_mph", config);
      var eventdelay = getValue("RiskAssessmentService_posted_speed_start_above_s", config);
      var endAfter = getValue("SpeedingDetectionService_end_below_gt_ms", config);

      str += "<tr><td>Customer facing is ";
      if (cust.value == false) {
        str += '<div class="switchoff">OFF</div></td></tr>';
      } else {
        str += '<div class="switchon">ON</div></td></tr>';
      }
      str += "<tr><td>Media Profile is " + media.value + "</td></tr>";
      if (rta.value == true) {
        str += "<tr><td>Initial Alert Delay is " + initial_delay.value + "</td></tr>";
      }
      str += "<tr><td>Event Delay is " + eventdelay.value + " s</td></tr>";
      str += "<tr><td>End Event " + msToTime(endAfter.value) + " after speed drops below threshold</td></tr>";

      str += "<tr><td>Speeding Thesholds are <b>" + low.value + "</b> mph (" + Math.round(low.value * 1.60934) + " kph), <b>" + medium.value + "</b> mph (" + Math.round(medium.value * 1.60934) + " kph), <b>" + high.value + "</b> mph (" + Math.round(high.value * 1.60934) + " kph)</td></tr>";
      str += "</table></td></tr>";
    }
    str += "</tr></table>";
    return str;
  }

  function getDistractions(config) {
    var str = "<table><tr><th>Distraction Detection is ";

    var service = getValue("DriverBehaviourService_enable", config);
    var riskService = getValue("DistractionGlobal_enable", config);
    if (service.value == false || riskService.value == false) {
      str += '<div class="switchoff">OFF</div>';
    } else {
      str += '<div class="switchon">ON</div>';
      var rta = getValue("RiskAssessmentService_looking_down_should_play_rta", config);
      str += " / Alerts ";
      if (rta.value == false) {
        str += '<div class="switchoff">OFF</div>';
      } else {
        if (isIVAOff(config)) str += '<div class="switchoff">OFF &uarr;</div>';
        else str += '<div class="switchon">ON</div>';
      }
      str += "</th></tr>";

      str += "<tr><td><table>";
      var lookingDown = getValue("LookingDownDetector2_enable", config);
      var lookingDownService = getValue("RiskAssessmentService_looking_down_enabled", config);
      if (lookingDown.value == true && lookingDownService.value == true) {
        var cust = getValue("RiskAssessmentService_looking_down_is_customer_facing", config);
        var media_low = getValue("RiskAssessmentService_looking_down_low_media_profile", config);
        var media_medium = getValue("RiskAssessmentService_looking_down_high_media_profile", config);
        var media_high = getValue("RiskAssessmentService_looking_down_severe_media_profile", config);
        var backend = getValue("RiskAssessmentService_looking_down_backend_flags", config);

        str += "<td>Customer facing is ";
        if (cust.value == false) {
          str += '<div class="switchoff">OFF</div></td></tr>';
        } else {
          str += '<div class="switchon">ON</div></td></tr>';
        }
        str += "<tr><td>Backend flags " + printFlags(backend.value) + "</td>";
        str += "<tr><td>Media Profile by Severity is " + media_low.value + ", " + media_medium.value + ", " + media_high.value + "</td></tr>";
        var runtime = getValue("DriverBehaviourService_driver_behaviour_runtime", config);
        str += "<tr><td>Behavior Runtime is " + runtime.value + "</td></tr>";
        var minSpeed = getValue("DriverBehaviourService_minimum_speed_miph", config);
        str += "<tr><td>Minimum Speed is " + minSpeed.value + " mph (" + Math.round(minSpeed.value * 1.60934) + " kph)</td></tr>";
      } else str += '<tr><td>Looking Down Detection is <div class="switchoff">OFF</div></td></tr>';
      str += "</table></td></tr>";
    }
    str += "</tr></table>";
    return str;
  }

  function getCellPhone(config) {
    var str = "<table><tr><th>Cell Phone Detection is ";

    var service = getValue("CellPhoneDetector2_enable", config);
    var riskService = getValue("RiskAssessmentService_cell_phone_enabled", config);
    if (service.value == false || riskService.value == false) {
      str += '<div class="switchoff">OFF</div></th></tr>';
    } else {
      str += '<div class="switchon">ON</div>';
      var rta = getValue("RiskAssessmentService_cell_phone_should_play_rta", config);
      str += " / Alerts ";
      if (rta.value == false) {
        str += '<div class="switchoff">OFF</div>';
      } else {
        if (isIVAOff(config)) str += '<div class="switchoff">OFF &uarr;</div>';
        else str += '<div class="switchon">ON</div>';
      }
      str += "</th></tr>";
      str += "<tr><td><table>";
      var cust = getValue("RiskAssessmentService_cell_phone_is_customer_facing", config);
      var media = getValue("RiskAssessmentService_cell_phone_media_profile", config);
      var backend = getValue("RiskAssessmentService_cell_phone_backend_flags", config);
      var minSpeed = getValue("DriverBehaviourService_minimum_speed_miph", config);
      var eventDelay = getValue("RiskAssessmentService_cell_phone_distraction_ge_threshold_s", config);

      str += "<tr><td>Customer facing is ";
      if (cust.value == false) {
        str += '<div class="switchoff">OFF</div></td></tr>';
      } else {
        str += '<div class="switchon">ON</div></td></tr>';
      }
      str += "<tr><td>Backend flags " + printFlags(backend.value) + "</td>";
      str += "<tr><td>Media Profile is " + media.value + "</td></tr>";
      str += "<tr><td>Minimum Speed is " + minSpeed.value + " mph (" + Math.round(minSpeed.value * 1.60934) + " kph)</td></tr>";
      str += "<tr><td>Event Delay is " + eventDelay.value + " s</td></tr>";
      str += "</table></td></tr>";
    }
    str += "</tr></table>";
    return str;
  }

  function getSeatBelt(config) {
    var str = "<table><tr><th>Seat Belt Detection is ";

    var service = getValue("NoSeatBeltDetector2_enable", config);
    var riskService = getValue("RiskAssessmentService_no_seat_belt_enabled", config);
    if (service.value == false || riskService.value == false) {
      str += '<div class="switchoff">OFF</div></th></tr>';
    } else {
      str += '<div class="switchon">ON</div>';
      var rta = getValue("RiskAssessmentService_no_seat_belt_should_play_rta", config);
      str += " / Alerts ";
      if (rta.value == false) {
        str += '<div class="switchoff">OFF</div>';
      } else {
        if (isIVAOff(config)) str += '<div class="switchoff">OFF &uarr;</div>';
        else str += '<div class="switchon">ON</div>';
      }
      str += "</th></tr>";

      str += "<tr><td><table>";
      var cust = getValue("RiskAssessmentService_no_seat_belt_is_customer_facing", config);
      var media = getValue("RiskAssessmentService_no_seat_belt_media_profile", config);
      var backend = getValue("RiskAssessmentService_no_seat_belt_backend_flags", config);
      var minSpeed = getValue("RiskAssessmentService_no_seat_belt_speed_ge_threshold_miph", config);
      var eventDelay = getValue("RiskAssessmentService_no_seat_belt_distraction_ge_threshold_s", config);

      str += "<tr><td>Customer facing is </th>";
      if (cust.value == false) {
        str += '<div class="switchoff">OFF</div></td></tr>';
      } else {
        str += '<div class="switchon">ON</div></td></tr>';
      }
      str += "<tr><td>Backend flags " + printFlags(backend.value) + "</td>";
      str += "<tr><td>Media Profile is " + media.value + "</td>";
      str += "<tr><td>Minimum Speed is " + minSpeed.value + " mph (" + Math.round(minSpeed.value * 1.60934) + " kph)</td></tr>";
      str += "<tr><td>Event Delay is " + eventDelay.value + " s</td></tr>";
      str += "</table></td></tr>";
    }
    str += "</tr></table>";
    return str;
  }

  function getObstruction(config) {
    var str = "<table><tr><th>Obstruction Detection is ";

    var service = getValue("NoFaceDetector2_enable", config);
    var riskService = getValue("RiskAssessmentService_obstructed_enabled", config);
    if (service.value == false || riskService.value == false) {
      str += '<div class="switchoff">OFF</div></th></tr>';
    } else {
      str += '<div class="switchon">ON</div>';
      var rta = getValue("RiskAssessmentService_obstructed_should_play_rta", config);
      str += " / Alerts ";
      if (rta.value == false) {
        str += '<div class="switchoff">OFF</div>';
      } else {
        if (isIVAOff(config)) str += '<div class="switchoff">OFF &uarr;</div>';
        else str += '<div class="switchon">ON</div>';
      }
      str += "</th></tr>";

      str += "<tr><td><table>";
      var cust = getValue("RiskAssessmentService_obstructed_is_customer_facing", config);
      var media = getValue("RiskAssessmentService_obstructed_media_profile", config);
      var backend = getValue("RiskAssessmentService_obstructed_backend_flags", config);
      var solarFilter = getValue("RiskAssessmentService_obstructed_solar_position_alert_filter_enabled", config);
      var eventDelay = getValue("RiskAssessmentService_obstructed_distraction_ge_threshold_s", config);

      str += "<tr><td>Customer facing is ";
      if (cust.value == false) {
        str += '<div class="switchoff">OFF</div></td></tr>';
      } else {
        str += '<div class="switchon">ON</div></td></tr>';
      }
      str += "<tr><td>Backend flags " + printFlags(backend.value) + "</td>";
      str += "<tr><td>Media Profile is " + media.value + "</td></tr>";
      str += "<tr><td>Solar Filter is ";
      if (solarFilter.value == false) {
        str += '<div class="switchoff">OFF</div></td></tr>';
      } else {
        str += '<div class="switchon">ON</div></td></tr>';
      }
      str += "<tr><td>Event Delay is " + eventDelay.value + " s</td></tr>";
      str += "</table></td></tr>";
    }
    str += "</tr></table>";
    return str;
  }

  function getSmoking(config) {
    var str = "<table border=1><tr><th>Smoking Detection is ";

    var service = getValue("SmokingDetector2_enable", config);
    var riskService = getValue("RiskAssessmentService_smoking_enabled", config);
    if (service.value == false || riskService.value == false) {
      str += '<div class="switchoff">OFF</div></th></tr>';
    } else {
      str += '<div class="switchon">ON</div>';
      var rta = getValue("RiskAssessmentService_smoking_should_play_rta", config);
      str += " / Alerts ";
      if (rta.value == false) {
        str += '<div class="switchoff">OFF</div>';
      } else {
        if (isIVAOff(config)) str += '<div class="switchoff">OFF &uarr;</div>';
        else str += '<div class="switchon">ON</div>';
      }
      str += "</th></tr>";
      str += "<tr><td><table>";
      var cust = getValue("RiskAssessmentService_smoking_is_customer_facing", config);
      var media = getValue("RiskAssessmentService_smoking_media_profile", config);
      var backend = getValue("RiskAssessmentService_smoking_backend_flags", config);
      var eventDelay = getValue("RiskAssessmentService_smoking_duration_ge_threshold_s", config);

      str += "<tr><td>Customer facing is ";
      if (cust.value == false) {
        str += '<div class="switchoff">OFF</div></td></tr>';
      } else {
        str += '<div class="switchon">ON</div></td></tr>';
      }
      str += "<tr><td>Backend flags " + printFlags(backend.value) + "</td>";
      str += "<tr><td>Media Profile is " + media.value + "</td>";
      str += "<tr><td>Event Delay is " + eventDelay.value + " s</td></td></tr>";
      str += "</table></td></tr>";
    }
    str += "</tr></table>";
    return str;
  }

  function getDrowsiness(config) {
    var str = "<table><tr><th>Drowsiness Detection is ";

    var service = getValue("DrowsinessService_enable", config);
    var riskService = getValue("RiskAssessmentService_drowsiness_enabled", config);
    if (service.value == false || riskService.value == false) {
      str += '<div class="switchoff">OFF</div></th></tr>';
    } else {
      str += '<div class="switchon">ON</div>';
      var rta = getValue("RiskAssessmentService_drowsiness_should_play_rta", config);
      str += " / Alerts ";
      if (rta.value == false) {
        str += '<div class="switchoff">OFF</div>';
      } else {
        if (isIVAOff(config)) str += '<div class="switchoff">OFF &uarr;</div>';
        else str += '<div class="switchon">ON</div>';
      }
      str += "</th></tr>";

      str += "<tr><td><table>";
      var cust = getValue("RiskAssessmentService_drowsiness_is_customer_facing", config);
      var media = getValue("RiskAssessmentService_drowsiness_media_profile", config);
      var backend = getValue("RiskAssessmentService_drowsiness_backend_flags", config);
      var minSpeed = getValue("RiskAssessmentService_drowsiness_speed_ge_threshold_miph", config);

      str += "<tr><td>Customer facing is ";
      if (cust.value == false) {
        str += '<div class="switchoff">OFF</div></td></tr>';
      } else {
        str += '<div class="switchon">ON</div></td></tr>';
      }
      str += "<tr><td>Backend flags " + printFlags(backend.value) + "</td>";
      str += "<tr><td>Media Profile is " + media.value + "</td></tr>";
      str += "<tr><td>Minimum Speed is " + minSpeed.value + " mph (" + Math.round(minSpeed.value * 1.60934) + " kph)</td></tr>";
      str += "</table></td></tr>";
    }
    str += "</tr></table>";
    return str;
  }

  function getTailgating(config) {
    var str = "<table><tr><th>Tailgating Detection is ";

    var service = getValue("TailgatingService_enabled", config);
    var riskService = getValue("RiskAssessmentService_tg_enabled", config);
    if (service.value == false || riskService.value == false) {
      str += '<div class="switchoff">OFF</div></th></tr>';
    } else {
      str += '<div class="switchon">ON</div>';
      var rta = getValue("RiskAssessmentService_tg_should_play_rta", config);
      str += " / Alerts ";
      if (rta.value == false) {
        str += '<div class="switchoff">OFF</div>';
      } else {
        if (isIVAOff(config)) str += '<div class="switchoff">OFF &uarr;</div>';
        else str += '<div class="switchon">ON</div>';
      }
      str += "</th></tr>";

      str += "<tr><td><table>";
      var cust = getValue("RiskAssessmentService_tg_is_customer_facing", config);
      var media = getValue("RiskAssessmentService_tg_media_profile", config);
      var backend = getValue("RiskAssessmentService_tg_backend_flags", config);
      var minSpeed = getValue("RiskAssessmentService_tg_speed_ge_threshold_miph", config);
      var delayEvent = getValue("RiskAssessmentService_tg_duration_ge_threshold_s", config);
      var minimumTTH = getValue("RiskAssessmentService_tg_tth_le_threshold_s", config);

      str += "<tr><td>Customer facing is ";
      if (cust.value == false) {
        str += '<div class="switchoff">OFF</div></td></tr>';
      } else {
        str += '<div class="switchon">ON</div></td></tr>';
      }
      str += "<tr><td>Backend flags " + printFlags(backend.value) + "</td>";
      str += "<tr><td>Media Profile is " + media.value + "</td></tr>";
      str += "<tr><td>Minimum Speed is " + minSpeed.value + " mph (" + Math.round(minSpeed.value * 1.60934) + " kph)</td></tr>";
      str += "<tr><td>Delay before Event is " + delayEvent.value + " s</td></tr>";
      str += "<tr><td>Minimum TTH is " + minimumTTH.value + " s</td></tr>";
      str += "</table></td></tr>";
    }
    str += "</tr></table>";
    return str;
  }

  function getTailgatingPlusD(config) {
    var str = "<table border=1><tr><th>Tailgating+D Detection is ";

    var service = getValue("TailgatingService_enabled", config);
    var riskService = getValue("RiskAssessmentService_tg_distraction_enabled", config);
    if (service.value == false || riskService.value == false) {
      str += '<div class="switchoff">OFF</div></th></tr>';
    } else {
      str += '<div class="switchon">ON</div>';
      var rta = getValue("RiskAssessmentService_tg_distraction_should_play_rta", config);
      str += " / Alerts ";
      if (rta.value == false) {
        str += '<div class="switchoff">OFF</div>';
      } else {
        if (isIVAOff(config)) str += '<div class="switchoff">OFF &uarr;</div>';
        else str += '<div class="switchon">ON</div>';
      }
      str += "</th></tr>";

      str += "<tr><td><table>";
      var cust = getValue("RiskAssessmentService_tg_distraction_is_customer_facing", config);
      var media = getValue("RiskAssessmentService_tg_distraction_media_profile", config);
      var backend = getValue("RiskAssessmentService_tg_distraction_backend_flags", config);
      var minSpeed = getValue("RiskAssessmentService_tg_distraction_speed_ge_threshold_miph", config);
      var delayEvent = getValue("RiskAssessmentService_tg_distraction_distraction_ge_threshold_s", config);
      var minimumTTH = getValue("RiskAssessmentService_tg_distraction_tth_le_threshold_s", config);

      str += "<tr><td>Customer facing is ";
      if (cust.value == false) {
        str += '<div class="switchoff">OFF</div></td></tr>';
      } else {
        str += '<div class="switchon">ON</div></td></tr>';
      }
      str += "<tr><td>Backend flags " + printFlags(backend.value) + "</td>";
      str += "<tr><td>Media Profile is " + media.value + "</td></tr>";
      str += "<tr><td>Minimum Speed is " + minSpeed.value + " mph (" + Math.round(minSpeed.value * 1.60934) + " kph)</td></tr>";
      str += "<tr><td>Delay before Event is " + delayEvent.value + " s</td></tr>";
      str += "<tr><td>Minimum TTH is " + minimumTTH.value + " s</td></tr>";
      str += "</table></td></tr>";
    }
    str += "</tr></table>";
    return str;
  }

  function getPCW(config) {
    var str = "<table><tr><th>PCW Detection is ";

    var service = getValue("PcwService_enable", config);
    var riskService = getValue("RiskAssessmentService_pcw_enabled", config);
    if (service.value == false || riskService.value == false) {
      str += '<div class="switchoff">OFF</div></th></tr>';
    } else {
      str += '<div class="switchon">ON</div>';
      var rta = getValue("RiskAssessmentService_pcw_should_play_rta", config);
      str += " / Alerts ";
      if (rta.value == false) {
        str += '<div class="switchoff">OFF</div>';
      } else {
        if (isIVAOff(config)) str += '<div class="switchoff">OFF &uarr;</div>';
        else str += '<div class="switchon">ON</div>';
      }
      str += "</th></tr>";

      str += "<tr><td><table>";
      var cust = getValue("RiskAssessmentService_pcw_is_customer_facing", config);
      var media = getValue("RiskAssessmentService_pcw_media_profile", config);
      var backend = getValue("RiskAssessmentService_pcw_backend_flags", config);
      var minSpeed = getValue("RiskAssessmentService_pcw_speed_ge_threshold_miph", config);
      var minimumTTC = getValue("RiskAssessmentService_pcw_ttc_le_threshold_s", config);

      str += "<tr><td>Customer facing is ";
      if (cust.value == false) {
        str += '<div class="switchoff">OFF</div></td></tr>';
      } else {
        str += '<div class="switchon">ON</div></td></tr>';
      }
      str += "<tr><td>Backend flags " + printFlags(backend.value) + "</td>";
      str += "<tr><td>Media Profile is " + media.value + "</td></tr>";
      str += "<tr><td>Minimum Speed is " + minSpeed.value + " mph (" + Math.round(minSpeed.value * 1.60934) + " kph)</td></tr>";
      str += "<tr><td>Minimum TTC is " + minimumTTC.value + " s</td></tr>";
      str += "</table></td></tr>";
    }
    str += "</tr></table>";
    return str;
  }

  function getPCWPlusD(config) {
    var str = "<table><tr><th>PCW+D Detection is ";

    var service = getValue("PcwService_enable", config);
    var riskService = getValue("RiskAssessmentService_pcw_distraction_enabled", config);
    if (service.value == false || riskService.value == false) {
      str += '<div class="switchoff">OFF</div></th></tr>';
    } else {
      str += '<div class="switchon">ON</div>';
      var rta = getValue("RiskAssessmentService_pcw_distraction_should_play_rta", config);
      str += " / Alerts ";
      if (rta.value == false) {
        str += '<div class="switchoff">OFF</div>';
      } else {
        if (isIVAOff(config)) str += '<div class="switchoff">OFF &uarr;</div>';
        else str += '<div class="switchon">ON</div>';
      }
      str += "</th></tr>";

      str += "<tr><td><table>";
      var cust = getValue("RiskAssessmentService_pcw_distraction_is_customer_facing", config);
      var media = getValue("RiskAssessmentService_pcw_distraction_media_profile", config);
      var backend = getValue("RiskAssessmentService_pcw_distraction_backend_flags", config);
      var minSpeed = getValue("RiskAssessmentService_pcw_distraction_speed_ge_threshold_miph", config);
      var minimumTTC = getValue("RiskAssessmentService_pcw_distraction_ttc_le_threshold_s", config);

      str += "<tr><td>Customer facing is ";
      if (cust.value == false) {
        str += '<div class="switchoff">OFF</div></td></tr>';
      } else {
        str += '<div class="switchon">ON</div></td></tr>';
      }
      str += "<tr><td>Backend flags " + printFlags(backend.value) + "</td>";
      str += "<tr><td>Media Profile is " + media.value + "</td>";
      str += "<tr><td>Minimum Speed is " + minSpeed.value + " mph (" + Math.round(minSpeed.value * 1.60934) + " kph)</td></tr>";
      str += "<tr><td>Minimum TTC is " + minimumTTC.value + " s</td></tr>";
      str += "</table></td></tr>";
    }
    str += "</tr></table>";
    return str;
  }

  function getFCW(config) {
    var str = "<table><tr><th>FCW Detection is ";

    var service = getValue("FcwService_enable", config);
    var riskService = getValue("RiskAssessmentService_fcw_enabled", config);
    if (service.value == false || riskService.value == false) {
      str += '<div class="switchoff">OFF</div></th></tr>';
    } else {
      str += '<div class="switchon">ON</div>';
      var rta = getValue("RiskAssessmentService_fcw_should_play_rta", config);
      str += " / Alerts ";
      if (rta.value == false) {
        str += '<div class="switchoff">OFF</div>';
      } else {
        if (isIVAOff(config)) str += '<div class="switchoff">OFF &uarr;</div>';
        else str += '<div class="switchon">ON</div>';
      }
      str += "</th></tr>";

      str += "<tr><td><table>";
      var cust = getValue("RiskAssessmentService_fcw_is_customer_facing", config);
      var media = getValue("RiskAssessmentService_fcw_media_profile", config);
      var backend = getValue("RiskAssessmentService_fcw_backend_flags", config);
      var minSpeed = getValue("RiskAssessmentService_fcw_speed_ge_threshold_miph", config);
      var minimumTTC = getValue("RiskAssessmentService_fcw_ttc_le_threshold_s", config);

      str += "<tr><td>Customer facing is ";
      if (cust.value == false) {
        str += '<div class="switchoff">OFF</div></td></tr>';
      } else {
        str += '<div class="switchon">ON</div></td></tr>';
      }
      str += "<tr><td>Backend flags " + printFlags(backend.value) + "</td>";
      str += "<tr><td>Media Profile is " + media.value + "</td></tr>";
      str += "<tr><td>Minimum Speed is " + minSpeed.value + " mph (" + Math.round(minSpeed.value * 1.60934) + " kph)</td></tr>";
      str += "<tr><td>Minimum TTC is " + minimumTTC.value + " s</td></tr>";
      str += "</table></td></tr>";
    }
    str += "</tr></table>";
    return str;
  }

  function getFCWPlusD(config) {
    var str = "<table><tr><th>FCW+D Detection is ";

    var service = getValue("FcwService_enable", config);
    var riskService = getValue("RiskAssessmentService_fcw_distraction_enabled", config);
    if (service.value == false || riskService.value == false) {
      str += '<div class="switchoff">OFF</div></th></tr>';
    } else {
      str += '<div class="switchon">ON</div>';
      var rta = getValue("RiskAssessmentService_fcw_distraction_should_play_rta", config);
      str += " / Alerts ";
      if (rta.value == false) {
        str += '<div class="switchoff">OFF</div>';
      } else {
        if (isIVAOff(config)) str += '<div class="switchoff">OFF &uarr;</div>';
        else str += '<div class="switchon">ON</div>';
      }
      str += "</th></tr>";

      str += "<tr><td><table>";
      var cust = getValue("RiskAssessmentService_fcw_distraction_is_customer_facing", config);
      var media = getValue("RiskAssessmentService_fcw_distraction_media_profile", config);
      var backend = getValue("RiskAssessmentService_fcw_distraction_backend_flags", config);
      var minSpeed = getValue("RiskAssessmentService_fcw_distraction_speed_ge_threshold_miph", config);
      var minimumTTC = getValue("RiskAssessmentService_fcw_distraction_ttc_le_threshold_s", config);

      str += "<tr><td>Customer facing is ";
      if (cust.value == false) {
        str += '<div class="switchoff">OFF</div></td></tr>';
      } else {
        str += '<div class="switchon">ON</div></td></tr>';
      }
      str += "<tr><td>Backend flags " + printFlags(backend.value) + "</td>";
      str += "<tr><td>Media Profile is " + media.value + "</td>";
      str += "<tr><td>Minimum Speed is " + minSpeed.value + " mph (" + Math.round(minSpeed.value * 1.60934) + " kph)</td></tr>";
      str += "<tr><td>Minimum TTC is " + minimumTTC.value + " s</td></tr>";
      str += "</table></td></tr>";
    }
    str += "</tr></table>";
    return str;
  }

  function getValue(key, config) {
    var def = defs[key];
    if (config[key] != null) {
      var retval = JSON.parse('{"source": "configuration"}');
      retval.value = config[key];
      //console.log(JSON.stringify(retval));
      return retval;
    } else {
      var retval2 = JSON.parse('{"source": "default"}');
      retval2.value = def;
      //console.log(JSON.stringify(retval2));
      return retval2;
    }
  }
})();
