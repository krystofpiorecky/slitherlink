class Tile extends STFUI
{
    constructor()
    {
        super();

        this.lines = [];
    }

    create()
    {
        this.container = document.createElement("div");
        this.container.className = "tile";
    }

    update()
    {
        let sum = 0;

        this.lines.forEach(
            l => {
                if(l.value) sum++;
            }
        );

        if(this.value == sum) this.container.classList.add("done");
        else this.container.classList.remove("done");
    }

    setValue(_value)
    {
        this.value = _value;
        
        return this;
    }

    set value(_value)
    {
        this.value_var = _value;

        this.container.textContent = _value;

        this.update();
    }

    get value()
    {
        return this.value_var;
    }

    setPosition(_x, _y)
    {
        this.x = _x;
        this.y = _y;

        return this;
    }

    set x(_value)
    {
        this.x_var = _value;

        this.container.style.left = _value + "px";
    }

    get x()
    {
        return this.x_var;
    }

    set y(_value)
    {
        this.y_var = _value;

        this.container.style.top = _value + "px";
    }

    get y()
    {
        return this.y_var;
    }
}