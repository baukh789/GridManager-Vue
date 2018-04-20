<template>
    <div>
        <h2>I18N: {{option1.i18n}} </h2>
        <grid-manager v-bind:option="option1"></grid-manager>

        <h2>I18N: {{option2.i18n}} </h2>
        <grid-manager v-bind:option="option2"></grid-manager>

        <h2>I18N: {{option3.i18n}} </h2>
        <grid-manager v-bind:option="option3"></grid-manager>
    </div>
</template>
<script>
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
				return new Date(createDate);
			}
		},{
			key: 'lastDate',
			remind: 'the lastDate',
			width: '100px',
			text: '最后修改时间',
			sorting: '',
			template: function(lastDate, rowObject){
				return new Date(lastDate);
			}
		},{
			key: 'action',
			remind: 'the action',
			width: '100px',
			text: '操作',
			template: function(action, rowObject){
				return '<span class="plugin-action edit-action" learnLink-id="'+rowObject.id+'">编辑</span>'
						+'<span class="plugin-action del-action" learnLink-id="'+rowObject.id+'">删除</span>';
			}
		}];
	var option1 = {
		gridManagerName: "testVue-en-us",
        i18n: 'en-us',
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

	var option2 = {
		gridManagerName: "testVue-zh-tw",
		i18n: 'zh-tw',
		height: "400px",
		columnData: colData,
		supportRemind: true,
		isCombSorting:  true,
		supportAjaxPage: true,
		supportSorting: true,
		ajax_url: "http://www.lovejavascript.com/learnLinkManager/getLearnLinkList",
		ajax_type: "POST",
		query: {pluginId: 2},
		pageSize: 20
	};

	var option3 = {
		gridManagerName: "testVue-zh-cn",
		i18n: 'zh-cn',
		height: "400px",
		columnData: colData,
		supportRemind: true,
		isCombSorting:  true,
		supportAjaxPage: true,
		supportSorting: true,
		ajax_url: "http://www.lovejavascript.com/learnLinkManager/getLearnLinkList",
		ajax_type: "POST",
		query: {pluginId: 2},
		pageSize: 20
	};
	export default {
		data () {
			return {
				option1: option1,
				option2: option2,
				option3: option3,
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
