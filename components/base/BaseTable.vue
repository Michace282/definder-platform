<template>
  <div :class="{ 'base-table_hide-overflow': hideOverflow }" class="base-table">
    <table class="base-table__container">
      <thead class="base-table__header">
        <tr class="base-table__header-row">
          <th
            v-for="head in headers"
            :key="getHeaderKey(head)"
            class="base-table__header-cell"
          >
            <slot name="table-th" :head="head" />
          </th>
        </tr>
      </thead>

      <tbody class="base-table__body">
        <tr
          v-for="item in items"
          :key="getItemKey(item)"
          class="base-table__body-row"
        >
          <td
            v-for="head in headers"
            :key="getHeaderKey(head)"
            class="base-table__body-cell"
          >
            <slot name="table-td" :head="head" :item="item" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'BaseTable',

  props: {
    headers: {
      type: Array,
      default: () => [],
    },

    getHeaderKey: {
      type: Function,
      default: (item) => item,
    },

    items: {
      type: Array,
      default: () => [],
    },

    getItemKey: {
      type: Function,
      default: (item) => item,
    },

    hideOverflow: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/base/base-table';
</style>
