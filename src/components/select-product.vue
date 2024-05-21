<template>
  <el-row style="margin-bottom: 20px;">
    <el-card shadow="never" style="width: 100%">
      <el-checkbox v-model="allSelected" label="Выбрать всех"/>
    </el-card>
  </el-row>

  <el-row :gutter="20">
    <el-col :span="12">
      <el-row
        v-for="[category, collection] in Object.entries(staff)"
        :key="category"
        style="margin-bottom: 20px;"
      >
        <el-col>
          <product-table-cards
            :header="TITLE[category]"
            :collection="collection"
            :selected="selected"
            @update:selected="$emit('update:selected', $event)"
          ></product-table-cards>
        </el-col>
      </el-row>
    </el-col>

    <el-col :span="12">
      <slot name="right-side"></slot>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { Employee, Staff } from '../typing.ts';
import ProductTableCards from './product-table.vue';
import { differenceWith, isEqual } from 'lodash';
import { TITLE } from '../constants.ts';

const props = defineProps<{
  staff: Staff
  selected: Employee[]
}>();

const emit = defineEmits<{
  (e: 'update:selected', value: Employee | Employee[]): void
}>();

const collection = computed(() => Object.values(props.staff).flat());
const allSelected = computed({
  get: () => !differenceWith(collection.value, props.selected, isEqual).length,
  set: value => emit('update:selected', value ? collection.value : [])
});
</script>