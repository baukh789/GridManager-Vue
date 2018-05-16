<template>
    <div>
        <grid-manager v-bind:option="option"></grid-manager>
    </div>
</template>
<script>
    import Vue from 'vue';
	var colData = [
		{
			key: 'name',
			remind: 'the name',
			width: '100px',
			text: '名称',
			sorting: ''
		},{
			key: 'info',
			remind: 'the info',
			text: '使用说明'
		},{
			key: 'url',
			remind: 'the url',
			text: 'url'
		},{
			key: 'createDate',
			remind: 'the createDate',
			width: '100px',
			text: '创建时间',
			sorting: 'DESC',
			template: function(createDate, rowObject){
				return new Date(createDate).toLocaleDateString();
			}
		},{
			key: 'lastDate',
			remind: 'the lastDate',
			width: '100px',
			text: '最后修改时间',
			sorting: '',
			template: function(lastDate, rowObject){
				return new Date(lastDate).toLocaleDateString();
			}
		},{
			key: 'action',
			remind: 'the action',
			width: '100px',
			text: '操作',
			template: (action, rowObject) => {
			    var fn = this.a.testGM;
			    // TODO 这里的域存在问题，需要调一下
                return '<span class="plugin-action del-action" learnLink-id="'+rowObject.id+'" gm-click="fn">删除</span>';
			}
		}];
	var option = {
		gridManagerName: "testVue",
		height: "400px",
		columnData: colData,
		supportRemind: true,
		isCombSorting:  true,
		supportAjaxPage: true,
		supportSorting: true,
		ajax_url: "http://www.lovejavascript.com/learnLinkManager/getLearnLinkList",
		ajax_type: "POST",
		query: {pluginId: 1},
		pageSize: 20
	};
	export default {
		data () {
			return {
			    name: 'app',
				option: option
			}
		},
        // 测试vue下的GM事件
        testGM(o) {
            console.log('testGM', arguments[0]);
            return this;
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
