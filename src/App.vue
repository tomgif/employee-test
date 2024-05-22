<template>
  <div class="common-layout">
    <el-container>
      <el-header
        height="64px"
        style="background-color: #c6e2ff"
      >
        <h1>Salary Bonus</h1>
      </el-header>

      <el-main>
        <p>
          Наше приложение используется для премирования сотрудников. <br/>
          Информацию по сотрудникам мы получаем через API-клиент (mockApi). <br/>
          Отображение сотрудников по отделам уже реализовал наш разработчик. <br/>
          <strong>Наша задача</strong> - реализовать выбор сотрудников при помощи соответствующих чекбоксов для отправки на сервер в виде массива.<br/>
          Предыдущий разработчик уже написал функцию
          <strong>updateCollection</strong>, однако, она не соответствует необходимым требованиям и должна быть переписана:
        </p>

        <ul>
          <li>функция должна уметь добавлять элемент в массив <strong>selected</strong></li>
          <li>функция должна исключать элемент из массива
            <strong>selected</strong> если такой элемент уже присутствует в массиве <strong>selected</strong></li>
          <li>функция должна уметь добавлять элементы переданного массива в массив <strong>selected</strong></li>
          <li>если в массиве <strong>selected</strong> присутствует хотя бы 1 элемент переданного массива, то массив
            <strong>selected</strong> должен быть расширен недостающими элементами
          </li>
          <li>если в массиве
            <strong>selected</strong> присутствуют все элементы переданного массива, то все элементы переданного массива должны быть исключены из массива
            <strong>selected</strong></li>
          <li>недопустимо менять код компонентов из <strong>./components</strong></li>
          <li>в любой момент разработчики сервера могут передать новую коллекцию
            <strong>testers</strong>, элементы которой также можно будет добавить в массив <strong>selected</strong>
          </li>
        </ul>

        <select-staff
          v-model:selected="selected"
          :staff="state.staff"
        >
          <template #right-side>
            <el-card shadow="never">
              <template #header>
                Результат

                <el-button @click="reset">
                  Сбросить
                </el-button>
              </template>
              <pre>{{ selected }}</pre>
            </el-card>
          </template>
        </select-staff>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import mockApi from './services/mockApi';
import { computed, onBeforeMount, reactive } from 'vue';
import SelectStaff from './components/select-staff.vue';
import { Employee, Staff } from './typing.ts';

const state: {
  staff: Staff
  selected: Employee[]
} = reactive({
  staff: {} as Staff,
  selected: []
});

onBeforeMount(async () => {
  try {
    state.staff = await mockApi() as Staff;
  } catch {
    console.log('Some Error');
  }
});

const updateCollection = (value: Employee | Employee[]) => {
  selected.value.push(
    ...(Array.isArray(value) ? value : [value])
  );
};

const selected = computed({
  get: () => state.selected,
  set: updateCollection
});

const reset = () => {
  state.selected = [];
};
</script>