class Line extends STFUI
{
    constructor()
    {
        super();

        this.tiles = [];

        this.container.onclick = e => {
            this.onClick(e);
        };

        this.value_element.onclick = e => {
            this.onClick(e);
        };
    }

    create()
    {
        this.container = document.createElement("div");
        this.container.className = "line";

        this.value_element = document.createElement("div");
        this.value_element.className = "line_value";
    }

    appendTo(_destination)
    {
        _destination.appendChild(this.container);
        _destination.appendChild(this.value_element);

        return this;
    }

    remove()
    {
        this.container.remove();
        this.value_element.remove();

        return this;
    }

    onClick(e)
    {
        if(this.value == true) this.value = false;
        else if(this.value == false) this.value = undefined;
        else this.value = true;
        
        this.tiles.forEach(
            t => {
                t.update();
            }
        );
    }

    setValue(_value)
    {
        this.value = _value;

        return this;
    }

    set value(_value)
    {
        this.value_var = _value;

        this.value_element.classList.remove("true");
        this.value_element.classList.remove("false");

        if(_value == true) this.value_element.classList.add("true");
        else if(_value == false) this.value_element.classList.add("false");
    }

    get value()
    {
        return this.value_var;
    }

    setPosition(_x, _y, _r)
    {
        this.x = _x;
        this.y = _y;
        this.r = _r;

        return this;
    }

    set x(_value)
    {
        this.x_var = _value;

        this.container.style.left = _value + "px";
        this.value_element.style.left = _value + "px";
    }

    get x()
    {
        return this.x_var;
    }

    set y(_value)
    {
        this.y_var = _value;

        this.container.style.top = _value + "px";
        this.value_element.style.top = _value + "px";
    }

    get y()
    {
        return this.y_var;
    }

    set r(_value)
    {
        this.r_var = _value;

        this.container.style.transform = "translate(-50%, -50%) rotate(" + _value + "deg)";
        this.value_element.style.transform = "translate(-50%, -50%) rotate(" + _value + "deg)";
    }

    get r()
    {
        return this.r_var;
    }
}