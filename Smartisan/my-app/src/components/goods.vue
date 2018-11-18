<template>
<div class="sku-box">
   <div class="item">
							<div>
								<div class="item-img"><img alt="Smartisan 快充移动电源 10000mAh" :src="goodsData.stock_info[num].image" style="opacity: 1;">
								</div>
								<h6>{{goodsData.stock_info[num].title}}</h6>
								<h3 >{{goodsData.stock_info[num].sub_title}}</h3>
								<div class="params-colors">
									<ul class="colors-list">
										<li v-for="(item,index) in goodsData.stock_info" :key="index" @click="transNum(index)">
											<a href="javascript:;" :class="[index==num?'active':'']" :style="'background-color:'+item.detail.color" style="background-clip:content-box;">
												
											</a>
										</li>
									</ul>
								</div>
								<div class="item-btns clearfix">
									<span class="item-gray-btn">
										<router-link :to="'/detail/'+goodIndex">查看详情</router-link>
										
									</span>
									 <span class="item-blue-btn" @click="addNum(goodsData.stock_info[num])" >加入购物车 </span>
								</div>
								<div class="item-price clearfix">
									<i>¥</i><span>{{goodsData.stock_info[num].price}}</span>
								</div>
								<div class="discount-icon">false</div>
								<div class="item-cover">
									<a href="javascript:;" target="_blank"></a>
								</div>
							</div>
						</div>
</div>
</template>

<script>
export default {
	data() {
		return {
			num: 0
		}
	},
	props: {
		goodsData:Object,
		goodIndex:Number
	},
	methods: {
		transNum(n) {
			this.num=n
		},
		addNum(item){
			this.$store.commit('plus',item);
		}
		
	},
};
</script>

<style scoped>

</style>