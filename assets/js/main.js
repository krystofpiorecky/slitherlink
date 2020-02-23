addEventListener(
	"load",
	() => {

        let game = document.querySelector(".game");

        let lines = [];
        let tiles = [];

        function create(_size)
        {
            lines.forEach(l => l.remove());
            tiles.flat(1).forEach(t => t.remove());

            lines = [];
            tiles = [];

            let line_lenghts = [];
            for(let i = 0; i < _size; i++)
            {
                line_lenghts.push(
                    Math.floor(
                        _size - Math.abs(
                            i - _size/2 + 0.5
                        )
                    )
                );
            }

            for(let i = 0; i < line_lenghts.length; i++)
            {
                tiles[i] = [];

                for(let j = 0; j < line_lenghts[i]; j++)
                {
                    let tile = new Tile();
                    tiles[i].push(tile);
                }
            }

            for(let i = 0; i < line_lenghts.length; i++)
            {
                for(let j = 0; j < line_lenghts[i]; j++)
                {
                    let tx = (j-line_lenghts[i]/2+0.5)*25.981*2;
                    let ty = (i-line_lenghts.length/2+0.5) * 22.5 * 2;

                    tiles[i][j]
                        .setPosition(tx, ty)
                        .appendTo(game);

                    for(let k = 0; k < 6; k++)
                    {
                        let nx = j;
                        let ny = i;

                        if(k%3 == 0) nx -= k/3*2 - 1
                        else
                        {
                            if(k<3) ny--;
                            else ny++;

                            if(line_lenghts[ny] == undefined)
                            {
                                nx = -1;
                                ny = -1;
                            }
                            else
                            {
                                let diff = line_lenghts[ny] - line_lenghts[i];
                                if((k == 1 || k == 5) && diff == 1) nx++;
                                else if((k == 2 || k == 4) && diff == -1) nx--;
                            }
                        }

                        let line = undefined;

                        let nl = tiles[ny];
                        if(nl != undefined)
                        {
                            let n = nl[nx];
                            if(n != undefined)
                            {
                                line = n.lines[(k+3)%6];
                                // console.log({i,j,k,nx,ny});
                            }
                        }

                        if(line == undefined)
                        {
                            let la = 0-Math.PI*k*2/6;
                            let lx = Math.cos(la) * 25.981 + tx;
                            let ly = Math.sin(la) * 25.981 + ty;

                            line = new Line()
                                .setPosition(lx, ly, ((la*180/Math.PI)+90))
                                .appendTo(game);

                            lines.push(line);
                        }

                        tiles[i][j].lines[k] = line;
                        line.tiles.push(tiles[i][j]);
                    }
                }
            }
        }

        let size_select = new STFUI.Select()
            .addItems([
                {
                    text: "Small",
                    value: 5
                },
                {
                    text: "Medium",
                    value: 9
                },
                {
                    text: "Large",
                    value: 11
                },
                {
                    text: "Huge",
                    value: 21
                }
            ])
            .appendTo(document.body);

        new STFUI.Button()
            .setContent("Generate")
            .setColor("link")
            .setOnclick(e => {
                create(size_select.value);
                generate(tiles, lines); 
            })
            .appendTo(document.body);
    }
);

function generate(_tiles, _lines)
{
    let first = true;
    let in_count = Math.floor(
        (Math.random() * 0.2 + 0.4) * _tiles.map(t => t.length).reduce((a, b) => a + b, 0)
    );

    let count = 0;;

    while(count < in_count)
    {
        let y = Math.floor(Math.random() * _tiles.length);
        let x = Math.floor(Math.random() * _tiles[y].length);

        if(!_tiles[y][x].inside)
        {
            let nc = _tiles[y][x].lines.map(
                l => {
                    let n = l.tiles.find(t => t != _tiles[y][x]);
    
                    if(n != undefined)
                    {
                        if(n.inside) return 1;
                    }
    
                    return 0;
                }
            ).reduce((a, b) => a + b, 0);
    
            if(nc > 0 || first)
            {
                count++;
                _tiles[y][x].inside = true;
            }
        }

        first = false;
    }
    

    _lines.forEach(
        l => {
            let n = l.tiles
                .map(t => t.inside ? 1 : 0)
                .reduce((a, b) => a + b, 0);
            
            l.value = n == 1;
        }
    );

    _tiles
        .flat(1)
        .forEach(
        t => {
            if(Math.random() > 0.5)
            {
                t.value = t.lines
                    .map(l => l.value ? 1 : 0)
                    .reduce((a, b) => a + b, 0);
            }
            else
            {
                t.value = undefined;
            }         
        }
    );

    _lines.forEach(
        l => {
            l.value = undefined;
        }
    );

    _tiles
        .flat(1)
        .forEach(
        t => {
            t.inside = false;
            t.update();       
        }
    );
}