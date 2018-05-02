<style lang="scss" src="./css/apticket.scss" scoped></style>
<template>
	<div class="apticket">
		<bl-bar barStyle="bar-white">
			<div class="button" slot="left-button" v-back><div class="iconfont arrow-back"></div></div>
			<div slot="title">{{ title }}</div>
			<div class="button" slot="right-button"><div class="del" @click="del">删除</div></div>
		</bl-bar>
		<transition name="fade">
			<div class="mess" v-if="isMess">{{ message }}<i @click="isMess = !isMess"></i></div>
		</transition>
		<div class="tip">您的增票资质：<span>{{ qual }}</span></div>
		<dl class="infomation">
			<dt>{{ infoMationtip }}</dt>
			<dd v-for="(item, index) in infoMation" :key="index">
				<label>{{ item.label }}</label> <input type="text" :placeholder="item.placeholder" v-model.trim="item.val" ref="'type'+index" @keyup="initBlur(index)">
				<i v-if="item.state" @click="clearInit(index)"></i>
			</dd>
		</dl>

		<div class="agreement">
			<p><i @click="isAgree = !isAgree" :class="[isAgree ? 'agree' : '']"></i> 我已阅读并同意<span>《增票资质确认书》</span></p>
			<bl-button class="submit" :disabled="!disabled" @click="submit">提交</bl-button>
		</div>

		<bl-modal v-if="isDel" :buttons="buttons" :content="content"></bl-modal>

	</div>
</template>
<script>
export default {
  name: 'apticket',
  data() {
    return {
      isMess: true,
      isAgree: false,
      isDel: false,
      message: '您的有效增值税发票资质仅为一个。',
      qual: '尚无资格',
      title: '增票资质',
      infoMationtip: '增专票资质信息',
      infoMation: [
      	{label: '单位名称', placeholder: '请输入单位名称', state: false, val: ''},
      	{label: '纳税人编码', placeholder: '请输入纳税人编码', state: false, val: ''},
      	{label: '注册地址', placeholder: '请输入注册地址', state: false, val: ''},
      	{label: '注册电话', placeholder: '请输入注册电话', state: false, val: ''},
      	{label: '开户银行', placeholder: '请输入开户银行', state: false, val: ''},
      	{label: '银行帐户', placeholder: '请输入银行帐户', state: false, val: ''}
      ],
      content: '是否删除该增票资质？',
      buttons: [{
        text: '取消',
        onClick: () => {
        	this.isDel = false
        }
      }, {
        text: '删除',
        onClick: () => {
        	this.isDel = false
        }
      }]
    }
  },
  created() {
  },
  methods: {
  	del() {
  	  	this.isDel = true
  	},
  	initBlur(index) {
		this.infoMation[index].val.length > 0 ? this.infoMation[index].state = true : this.infoMation[index].state = false
  	},
  	clearInit(index) {
  		this.infoMation[index].state = false
  		this.infoMation[index].val = ''
  	},
  	submit() {
  		let array = this.infoMation
		/*
		for (let o of Array.from(array)) {
			console.log(o.val)
		}
		*/
		array.map(function(item, index) {
			console.log(item.val, index)
		})
		this.$toast('提交成功')
  	}
  },
  computed: {
  	disabled: function() {
  		let array = []
		for (let o of Array.from(this.infoMation)) {
			array.push(o.val)
		}
		let o = array.indexOf('')
  		return o === -1 && this.isAgree
  	}
  }
}
</script>
