# MOJP Gentrees App - Export container

Handles sync, backup and export of family trees data collected via the gentrees web app.

The docker-compose environment runs the sync processed periodically as well as on startup.

Rebuild the export container

```
docker-compose up -d --build export
```

Follow the logs

```
docker-compose logs -f export
```

Send trees to email (create some trees first)

```
docker-compose exec export /export/entrypoint.sh send-trees -s 0 -e test@example.com
```
