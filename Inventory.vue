<template>
        <div class="InventoryCont">
            <div>
                <NavBar/>
            </div>
            <div id="loads"></div>
                <br>
                <br>
            <div class="blockDiv">
                <div class="Category">
                    <h5>Pricing Trends</h5>
                    <p>Prices are shown minimum values from all websites</p>
                </div>
                    <br>
                    <br>
                <div class="showCont">
                     <div class="customeCat">
                         <b-dropdown size="sm" 
                                     id="dropdown-dropright" 
                                     dropright text="Products"
                                     class="m-md-2"
                                     variant="dark">
                             <div id="formDiv">
                            <b-dropdown-form    v-for="(product, index) in filteredArr" 
                                                :key="product.label" 
                                                aria-haspopup="true" 
                                                aria-expanded="false"
                                                id="forms">
                                                
                                    <label id="Labelss">
                                        <input type="checkbox"
                                                v-model="checkitems[index]"
                                                :value ="product.label"
                                                :id="product.label"
                                                @click="filter($event)">

                                        {{product.label}}
                                    </label>  
                                </b-dropdown-form>
                            </div>
                            </b-dropdown>
                            <button type="button"
                                    id="ReloadBut"
                                    @click="reload()">
                                Reload
                            </button>
                    </div>
                </div>
                <div class="ChartCont">
                    <canvas id="chart">
                    </canvas>
                </div>

                <!-- <div class="PieCont">
                    <canvas id="Pie"></canvas>
                </div> -->

                <!-- <div class="dropdown">
                    <button class="dropbtn">
                                        Products
                    </button>
                    <div class="dropdown-content">
                        <div id="formDiv">
                            <div v-for="(product, index) in filteredArr" 
                                :key="product.label">
                                    <input type="checkbox"
                                            v-model="checkitems[index]"
                                            :value ="product.label"
                                            :id="product.label">
                                                <label v-bind:style="{ color: product.borderColor }">
                                                    
                                                        {{product.label}}
                                    
                                                </label>
                            </div>
                        </div>
                        
                    </div>
                </div> -->

            </div>
        </div>  
</template>

<script src="../../src/components/JS/InventoryScript.js"></script>