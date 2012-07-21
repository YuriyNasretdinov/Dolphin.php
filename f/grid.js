var Grid = function()
{
    var T = this;
    var _fetchFunc, _countFunc, _rowClickFunc, _rowChangeFunc, _colorForRowFunc;
    var _widths, _fields, _fieldsNum, _container, _id, _visibleRows, _zebraColor;

    var _previousPos, _currentPos, _currentOffset, _shown, _scrollboxHeight, _scrollerHeight;
    var _scrollerIsMoving = false, _needRedraw = false;
    var _rowHeight = 30;

    T.setup = function(settings)
    {
        _widths = settings.widths;
        _fields = settings.fields;
        var i = 0;
        for (var k in _fields) i++;
        _fieldsNum = i;
        _fetchFunc = settings.fetch;
        _countFunc = settings.count;
        _rowClickFunc = settings.onRowClick;
        _rowChangeFunc = settings.onRowChange;
        _colorForRowFunc = settings.colorForRow;
        _container = settings.container;
        _zebraColor = settings.zebraColor;
        if (!Grid.id) Grid.id = 1;
        _id = 'dgrid_' + (Grid.id++);
        _visibleRows = Math.ceil(_container.offsetHeight / _rowHeight) - 1;
        _previousPos = 0;
        _currentPos = 0;
        _currentOffset = 0;
    };

    /* function to  */
    function _try(func)
    {
        try {
            func();
        } catch (e) {
            if (!window.console) return;
            console.log && console.log(e);
            console.trace && console.trace();
        }
    }

    function _colWidth(k)
    {
        return _widths[k] ? _widths[k] - 1 : 100;
    }

    function _getHeaderHTML()
    {
        var code = [], i = 0;

        code.push('<div class="gggr_head"><table cellspacing="0" cellpadding="0" class="gggr_head_table" id="'+_id+'_head"><thead><tr height="' + (_rowHeight - 1) + '">');

        for(var k in _fields)
        {
            code.push('<th width="'+_colWidth(k)+'" class="gggr_cell gggr_th_header"><div style="width: '+_colWidth(k)+'px;" class="gggr_header">' + _fields[k] + '</div></th>');

            i++;

            var visible = i != _fieldsNum && i != 1;

            code.push('<th width="1"'+(visible ? '': ' style="visibility:hidden;"')+'><img src="f/ni/filelist-head-delim.png" width="1" height="30" style="background: #afafaf;"></th>');
        }

        code.push('</tr></thead></table></div><div id="'+_id+'_body" class="gggr_body"></div>');

        return code.join('');
    }

    function _getScrollerHTML()
    {
        _scrollboxHeight = _container.offsetHeight - _rowHeight - 10;
        _scrollerHeight = Math.ceil(_scrollboxHeight * _visibleRows / _countFunc());
        _scrollerHeight = Math.max(20, _scrollerHeight);
        if (_scrollerHeight > _scrollboxHeight) return '';
        var code = [];
        code.push('<div class="grid_scrollbox" style="height: ' + _scrollboxHeight + 'px;">');
        code.push('<div class="grid_scroller" id="' + _id + '_scroller" style="height: ' + _scrollerHeight + 'px;"></div>');
        code.push('</div>');
        return code.join('');
    }

    function _rowEl(i) {
        return document.getElementById(_id + '_row_' + i);
    }

    function _deleteRow(i) {
        var el = _rowEl(i);
        if (el) el.parentNode.removeChild(el);
        delete _shown[i];
    }

    function _scrollBody()
    {
        var body = document.getElementById(_id + '_body'), rowData, row, cell, i, k, data;
        for (k in _shown) {
            if (k < _currentPos || k > _currentPos + _visibleRows) _deleteRow(k);
        }
        var cnt = _countFunc();

        var firstChild = body.firstChild;
        for (i = _currentPos; i < cnt && i < _currentPos + _visibleRows; i++) {
            if (_shown[i]) continue;
            rowData = _fetchFunc(i);
            row = document.createElement('div');
            row.id = _id + '_row_' + i;
            row.style.height = (_rowHeight - 1) + 'px';
            row.className = 'grid_row';

            var bgcolor = '';
            if (_colorForRowFunc) bgcolor = _colorForRowFunc(rowData, i);
            if (!bgcolor && _zebraColor && i % 2 == 0) bgcolor = _zebraColor;
            if (bgcolor) row.style.backgroundColor = bgcolor;

            for (k in _fields) {
                cell = document.createElement('div');
                cell.className = 'grid_row_cell';
                cell.style.width = (_colWidth(k) - 5) + 'px'; // padding is 3+3 px
                cell.style.height = (_rowHeight - 1) + 'px';
                cell.style.lineHeight = (_rowHeight - 1) + 'px';
                data = rowData[k];
                // if data() is a function, then it must supply the corresponding DOM element
                if (typeof(data) != "function") {
                    cell.appendChild(document.createTextNode(data));
                } else {
                    cell.appendChild(data());
                }

                (function(i) {
                    cell.addEventListener('mousedown', function(e) {
                        e.preventDefault && e.preventDefault();
                        e.stopPropagation && e.stopPropagation();
                        _rowClickFunc && _rowClickFunc(_fetchFunc(i), i, e);
                        return false;
                    });
                })(i);

                row.appendChild(cell);
            }

            if (firstChild && i <= _previousPos) {
                body.insertBefore(row, firstChild);
            } else {
                body.appendChild(row);
            }

            _shown[i] = true;
        }

        var el = _rowEl(_previousPos);
        if (el) el.style.marginTop = '';
        el = _rowEl(_currentPos);
        if (el) el.style.marginTop = '-' + (_currentOffset - _currentPos * _rowHeight) + 'px';

        _previousPos = _currentPos;

    }

    function _setupBodyScroll()
    {
        var body = document.getElementById(_id + '_body');
        body.addEventListener('mousewheel', function(e) {
            var delta = e.wheelDeltaY || e.wheelDelta;
            T.scroll(-delta);
        });

        body.addEventListener('MozMousePixelScroll', function(e) {
            if (!e.VERTICAL_AXIS) return;
            T.scroll(e.detail);
        });
    }

    function _getMaxScrollerOffset()
    {
        return (_scrollboxHeight - _scrollerHeight);
    }

    var _fadeTimeout = false;
    function _moveScroller()
    {
        var el = document.getElementById(_id + '_scroller');
        if (!el) return;
        el.style.marginTop = Math.floor(_getMaxScrollerOffset() * (_currentOffset / _getMaxOffset())) + 'px';
        if (_scrollerIsMoving) return;
        el.className = 'grid_scroller grid_scroller_selected';
        if (_fadeTimeout) clearTimeout(_fadeTimeout);
        _fadeTimeout = setTimeout(function() {
            if (_scrollerIsMoving) return;
            el.className = 'grid_scroller';
        }, 400);
    }

    function _setupScroller()
    {
        _moveScroller();
        var el = document.getElementById(_id + '_scroller');
        if (!el) return;

        var beginY, beginOffset;
        var moveCallback, upCallback;

        moveCallback = function(e) {
            var delta = e.clientY - beginY;
            var relativeOffset = delta / _getMaxScrollerOffset();
            _setOffset(Math.floor(beginOffset + relativeOffset * _getMaxOffset()));
            _try(_scrollBody);
        };

        upCallback = function(e) {
            el.className = 'grid_scroller';
            _scrollerIsMoving = false;
            window.removeEventListener('mousemove', moveCallback);
            window.removeEventListener('mouseup', upCallback);
            if (_needRedraw) {
                _needRedraw = false;
                T.redraw();
            }
        };

        el.addEventListener('mouseover', function(e) {
            if (_scrollerIsMoving) return;
            el.className = 'grid_scroller grid_scroller_selected';
        });

        el.addEventListener('mouseout', function(e) {
            if (_scrollerIsMoving) return;
            el.className = 'grid_scroller';
        });

        el.addEventListener('mousedown', function(e) {
            e.preventDefault && e.preventDefault();
            e.stopPropagation && e.stopPropagation();

            beginY = e.clientY;
            beginOffset = _currentOffset;

            _scrollerIsMoving = true;
            el.className = 'grid_scroller grid_scroller_selected';
            window.addEventListener('mousemove', moveCallback);
            window.addEventListener('mouseup', upCallback);
        });


    }

    function _getMaxOffset()
    {
        return (_countFunc() + 1.5) * _rowHeight - _container.offsetHeight;
    }

    function _setOffset(value)
    {
        _currentOffset = Math.max(0, Math.min(_getMaxOffset(), value));
        _currentPos = Math.floor(_currentOffset / _rowHeight);
        if (_currentPos != _previousPos && _rowChangeFunc) {
            _try(function() { _rowChangeFunc(_currentPos); });
        }
        _moveScroller();
    }

    T.scroll = function(offset)
    {
        _setOffset(_currentOffset + offset);
        _try(_scrollBody);
    };

    T.redraw = function(pos)
    {
        _try(function() {
            // ensure current offset is correct
            _setOffset(pos !== undefined ? pos * _rowHeight : _currentOffset);
            _previousPos = 0;
            _shown = {}; // { row_number: true }
            _container.innerHTML = _getHeaderHTML() + _getScrollerHTML();
            _setupBodyScroll();
            _setupScroller();
            _scrollBody();
        });
    };

    T.setNeedsRedraw = function() {
        if (_scrollerIsMoving) {
            _needRedraw = true;
            return;
        }

        T.redraw();
    };
};
