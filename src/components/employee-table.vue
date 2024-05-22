<template>
  <el-card shadow="never">
    <template v-if="header.length" #header>
      <div class="card-header">
        <span>{{ header }}</span>
      </div>
    </template>

    <el-table
      :data="collection"
      style="width: 100%"
    >
      <el-table-column prop="checkbox" width="55">
        <template #header>
          <el-checkbox v-model="isAllSelected"/>
        </template>

        <template #default="{ row }">
          <el-checkbox
            :model-value="isSelected(row)"
            @update:modelValue="$emit('update:selected', row)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Имя"/>
      <el-table-column prop="date" label="Дата рождения"/>
    </el-table>
  </el-card>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { Employee } from '../typing.ts';
import { differenceWith, isEqual } from 'lodash';

const props = withDefaults(
  defineProps<{
    header?: string
    collection?: Employee[]
    selected: Employee[]
  }>(),
  {
    header: '',
    collection: () => [],
    selected: () => []
  }
);

const emit = defineEmits<{
  (e: 'update:selected', value: Employee | Employee[]): void
}>();

const isAllSelected = computed({
  get: () => !differenceWith(props.collection, props.selected, isEqual).length,
  set: () => emit('update:selected', props.collection)
});
const isSelected = (row: Employee) => props.selected.includes(row);
</script>