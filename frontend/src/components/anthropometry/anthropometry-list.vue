<template>
  <b-container fluid class="p-0">
    <b-row>
      <b-col>
        <b-table
          striped
          hover
          :items="anthropometries"
          :fields="anthropometryFields"
          v-show="anthropometries.length"
          :no-local-sorting="true"
          @row-clicked="navigateAnthropometry"
        >
          <template slot="actions" slot-scope="row">
            <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
            <b-button
              size="sm"
              variant="primary"
              @click.stop="navigateAnthropometry(row.item)"
              class="mr-1"
              v-t="'form.edit'"
            />
            <b-button
              size="sm"
              variant="info"
              @click.stop="selectAnthropometryForComparison(row.item)"
              v-t="'form.compare'"
            />
            <b-button
              size="sm"
              variant="danger"
              @click.stop="deleteAnthropometry(row.item)"
              v-t="'form.delete'"
            />
          </template>
        </b-table>
        <div
          class="text-muted text-center pt-5"
          v-show="anthropometries.length === 0 && !isSearchEmpty"
          v-t="{ path:'tables.noData', args: { term: searchTerm } }"
        ></div>
        <div
          class="text-muted text-center pt-5"
          v-show="anthropometries.length === 0 && isSearchEmpty"
          v-t="{ path:'tables.search', args: { entity: $tc('entities.anthropometry', 2).toLowerCase()} }"
        ></div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script src="./anthropometry-list.js"></script>
