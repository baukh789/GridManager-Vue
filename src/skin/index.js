import './index.css';
((GridManager) => {
    const option = {
        // 是否显示底部工具: 刷新按纽
        showFooterRefresh: false,

        // 是否显示底部工具: 快捷跳转
        showFooterGoTo: false,

        // 是否显示底部工具: 切换每页显示条数
        showFooterPageSize: false,

        // 是否显示底部工具: 分页描述信息
        showFooterPageInfo: true,

        // 是否显示底部工具: 分页描述信息
        supportAdjust: false,

        // 是否使用拖拽
        supportDrag: false,

        // 是否显示分割线
        disableLine: true,

        // 是否显示外围边线
        disableBorder: true,

        // 是否使用右键菜单
        supportMenu: false,

        // 禁用序号
        supportAutoOrder: false,

        // 数据加载中模板
        loadingTemplate: `<div class="loading-wrap">
                        <div class="loading-back"></div>
                        <div class="ant-spin ant-spin-lg ant-spin-spinning">
                            <span class="ant-spin-dot ant-spin-dot-spin"><i></i><i></i><i></i><i></i></span>
                        </div>
                      </div>`,
        // I18N
        textConfig: {
            'checked-info': {
                'zh-cn': '已选 <span style="color: #1890ff">{0}</span> 条',
                'zh-tw': '已選 <span style="color: #1890ff">{0}</span> 條',
                'en-us': 'selected <span style="color: #1890ff">{0}</span>'
            },
            'page-info': {
                'zh-cn': '共{2}条',
                'zh-tw': '共{2}條',
                'en-us': 'count {2}'
            },
            'first-page': {
                'zh-cn': '<i class="anticon anticon-double-left"></i>',
                'zh-tw': '<i class="anticon anticon-double-left"></i>',
                'en-us': '<i class="anticon anticon-double-left"></i>'
            },
            'previous-page': {
                'zh-cn': '<i class="anticon anticon-left"></i>',
                'zh-tw': '<i class="anticon anticon-left"></i>',
                'en-us': '<i class="anticon anticon-left"></i>'
            },
            'next-page': {
                'zh-cn': '<i class="anticon anticon-right"></i>',
                'zh-tw': '<i class="anticon anticon-right"></i>',
                'en-us': '<i class="anticon anticon-right"></i>'
            },
            'last-page': {
                'zh-cn': '<i class="anticon anticon-double-right"></i>',
                'zh-tw': '<i class="anticon anticon-double-right"></i>',
                'en-us': '<i class="anticon anticon-double-right"></i>'
            }
        }
    };
    GridManager.defaultOption = option;
})(window.GridManager);
