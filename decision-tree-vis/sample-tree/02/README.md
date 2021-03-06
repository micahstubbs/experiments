an iteration on with new decision tree data

changes:

- abstract nested tree data out into an external `data.json`

---

The `tree` layout implements the Reingold-Tilford algorithm for efficient, tidy arrangement of layered nodes. The depth of nodes is computed by distance from the root, leading to a ragged appearance. Radial orientations are also supported. Implementation based on work by [Jeff Heer](http://jheer.org/) and [Jason Davies](http://www.jasondavies.com/) using [Buchheim et al.](http://www.springerlink.com/content/u73fyc4tlxp3uwt8/)'s linear-time variant of the Reingold-Tilford algorithm. Data shows the [Flare](http://flare.prefuse.org/) class hierarchy, also courtesy Jeff Heer.

Compare to this [radial layout](/mbostock/4063550).