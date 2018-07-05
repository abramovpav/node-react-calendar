CREATE TABLE IF NOT EXISTS calendar.sessions (
   sid text,
   session text,
   PRIMARY KEY (sid)
) WITH default_time_to_live = 28800;