/**
 * Arron.y
 * yangyun4814@gmail.com
 * 2015-02-04
 * 折叠面板/外部导入插件
 * v0.0.1
 */

(function($) {
    $.fn.foldpanel = function(options) {

        var _init = options.init || true,
            _time = options.time || 100,
            _dbclose = options.dbclose || true,
            _flag = false;

        return this.each(function() {

            var $dts = $(this).children('dt');
            $dts.click(onClick);
            $dts.each(reset);

            if ( _init ) {
                $dts.eq(0).next().slideDown( _time );
                $dts.eq(0).data('flag', true);
            };
        });

        function onClick() {
            _this = $(this);
            _this.siblings('dt').each(hide);

            if ( _dbclose ) {
                if ( _this.data('flag') ) {
                    _this.next().slideUp( _time );
                    _this.data('flag', false);
                }else{
                    _this.next().slideDown( _time );
                    _this.data('flag', true);
                }
                return false;
            }else{
                _this.next().slideDown( _time );
            }
        }

        function hide() {
            $(this).next().slideUp( _time );
        }

        function reset() {
            _this = $(this);
            _this.next().hide();
            _this.data('flag', _flag);
        }
    }
})(jQuery);