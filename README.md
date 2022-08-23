# Setup
Create database inventar_db (script in **/inventar/database/src/setup/**).

Create and update schema and tables
**docker run -v /home/sascha/1_Dev/90_Repo/12_Inventar/database/:/flyway/conf --rm boxfuse/flyway migrate**