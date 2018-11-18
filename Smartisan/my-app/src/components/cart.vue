<template>
	<div class="nav-cart-wrapper">
								<div class="nav-cart-list">
									<div class="empty" v-if="cartList==0">
										<h3>购物车为空</h3>
										<p>您还没有选购任何商品，现在前往商城选购吧!</p>
									</div>
									<div class="full" v-if="cartList!=0">
										<div class="nav-cart-items">
											<ul>
												<li class="clear" v-for="(item,index) in cartList" :key="index">
													<div class="cart-item js-cart-item cart-item-sell">
														<div class="cart-item-inner">
															<div class="item-thumb">
																<img :src="item.image">
															</div>
															<div class="item-desc">
																<div class="cart-cell">
																	<h4> 
																		<a href="#/item/100027401">{{item.title}}</a>
																	</h4>
																	<p class="attrs">
																		<span>{{item.detail.color_name}}</span>
																	</p>
																	<h6>
																		<span class="price-icon">¥</span><span class="price-num">{{item.price}}</span><span class="item-num">x {{item.num}}</span>
																	</h6>
																</div>
															</div>
															<div class="del-btn" @click="delList(index)">删除</div>
														</div>
													</div>
												</li>
											</ul>
										</div>
										<div class="nav-cart-total">
											<p>共 <strong class="ng-binding">{{cartNum.all}}</strong> 件商品</p>
											<h5>合计：<span class="price-icon">¥</span><span class="price-num ng-binding" ng-bind="cartMenu.totalPrice">{{cartNum.allPrice}}</span></h5>
											<h6>
												<router-link class="nav-cart-btn" to='/count'>去购物车</router-link>
											
											</h6>
										</div>
									</div>
								</div>
							</div>
</template>

<script>
    export default {
        methods: {
            delList(index) {
                this.$store.commit('delList',index);
            }
        },
        computed: {
            cartList() {
                return this.$store.state.cartList; 
                
            },
            cartNum(){
                return this.$store.getters.allinfo;
            }
        }
    }
</script>

<style scoped>

</style>