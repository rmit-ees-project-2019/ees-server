## MBTiles Example

This example builds a tile server for a [MATSim](http://ci.matsim.org:8080/job/MATSim-Book/ws/partOne-latest.pdf) road network.
Uses npm packages [tilelive](https://www.npmjs.com/package/@mapbox/tilelive) and
[mbtiles](https://www.npmjs.com/package/@mapbox/mbtiles) to load a
[MBTiles](https://github.com/mapbox/mbtiles-spec) database and serve
vector tiles in the [Slippy XYZ format](https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames).
The browser renders the tiles within a [Mapbox](https://www.mapbox.com/api-documentation/) map.

**Note | 29-Sep-18 | DS** : *Vector tiles in gzipped protobuf format (what is
  served by the MBTiles server) are not supported by [OpenLayers](https://openlayers.org/),
  so at this stage Mapbox seems to be the best option for map based interaction
  with the MATSim network.*

### How to install
```
wget -O mbtiles.zip https://cloudstor.aarnet.edu.au/plus/s/a10DqAGJDP8QXFf/download
unzip -o mbtiles.zip
npm install
```

### How to run
```
npm start
```

### Notes on the `.mbtiles` files
The `mount_alexander_shire_network.mbtiles` file is a MATSim simulation network file in  [MBTiles](https://github.com/mapbox/mbtiles-spec) format. The idea is to load this database and serve each tile as requested by the browser client. Below are the steps to create such a file.

1. Create the MATSim network (``.xml.gz`) for Mount Alexander Shire and convert it to
GeoJSON format (`.json`) as follows. *Note that you will need GDAL [`ogr2ogr`](http://trac.osgeo.org/gdal/wiki/DownloadingGdalBinaries) and Java-8 (but not higher!) installed for this to work*.
```
./data/createExampleMATSimJsonNetworks.sh
```

2. Build `tippecanoe` as follows (see further [instructions here](https://github.com/mapbox/tippecanoe#installation);  *note that you will need the make/g++ toolchain for this to work)* :
```
git clone git@github.com:mapbox/tippecanoe.git ./data/tippecanoe
cd ./data/tippecanoe
make -j
cd -
```

3. Use tippecanoe to convert the GeoJSON (`.json`) to MBTiles (`.mbtiles`) format:
```
./data/tippecanoe/tippecanoe \
-o ./data/mount_alexander_shire_network.mbtiles \
./data/mount_alexander_shire_network/mount_alexander_shire_networkP.json
```
