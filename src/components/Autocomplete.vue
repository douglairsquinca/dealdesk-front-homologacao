<template>
  <div>
    <div class="form-floating">  
      <input
        type="text"
        :value="keyword"
        
        @input="onInput($event.target.value)"
        class="form-control rf_bg_form rf_texto" list="datalistoptions" id="marcasDataList" placeholder="Pesquisar Marcas"
    
      />
      <div v-show="options.length">
        <datalist id="datalistoptions">
            <option
            v-for="opt in options"
                :key="opt.id"
                >
                {{ opt.descricao }}
            ></option>
        </datalist>
       
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Autocomplete",
    props:{
        value:{
            type: String,
            default: '',
        },
        options:{
            type: Array,
            default:()=> [] ,
        },
    },
  data() {
    return {
        keyword:'',
    };
  },
  watch:{
    value(value){
        this.keyword = value;
    }
  },
  created(){
    this.keyword = this.value;
  },
  methods:{
    onInput(vl){
        this.$emit('input', vl)
        
        this.$emit('shouldSearch', vl)
    }
  }
};
</script>
<style>
@import "../../src/assets/styles/rfCss.css";
</style>