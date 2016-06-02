## polymer-elements-for-1.2.3

This Cubbles webpackage make a set of polymer elements available as utilities. If a polymer
element has related bundled elements, this would be available as endpoints of the utility.

### Use
To use a polymer element within a Cubble artifact (component, app or utility). The endpoint
reference should be include as dependency within the artifact in the manifest.webpackage
config file.

For example, the following would be an endpoint definition of an elementary component
that uses the polymer elements _google-map_ and _google-map-maker_.

```JSON
{
    "artifactId": "cubx-google-map",
    ...
    "endpoints": [
      {
        "endpointId": "main",
        "description": "This is recommended for you use with webcomponents.",
        "resources": [
          "cubx-google-map.html"
        ],
        "dependencies": [
          "cubx.core.rte@1.9.0/cubxpolymer/main",
          "polymer-elements-for-1.2.3@1.0.1-SNAPSHOT/google-map/google-map",
          "polymer-elements-for-1.2.3@1.0.1-SNAPSHOT/google-map/google-map-marker"
        ]
      }
    ]
    ...
}
```

Then the polymer tags can be used within the html code of this elementary component:

```HTML
<dom-module id="cubx-google-map">
    <template>
        <google-map id="myGoogleMap" latitude="37.77493" longitude="-122.41942">
          <google-map-marker latitude="37.779" longitude="-122.3892"
              draggable="true" title="Go Giants!">
          </google-map-marker>
        </google-map>
    </template>

    <script src="cubx-google-map.js"></script>
</dom-module>
```

Finally the polymer element properties and methods can be accessed and manipulated. For example
in in the javascript file associated to this elementary component, in this case
_cubx-google-map.js_, the google-map element can be accessed using the polymer method _$_:

```javascript
...
this.$.myGoogleMap.fitToMarkers = true;
...
```

Here a working [demo](https://cubbles.world/sandbox/com.incowia.cubx-google-map@0.1.0-SNAPSHOT/cubx-google-map/demo/index.html) is available.
Here the [source code](https://github.com/iCubbles/cubx-polymer-elements/tree/master/webpackages/com.incowia.cubx-google-map) of the demo is available.
