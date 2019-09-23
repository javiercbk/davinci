<template>
  <b-container fluid class="p-0">
    <b-row>
      <b-col>
        <b-table
          striped
          hover
          :items="sports"
          :fields="sportsFields"
          v-show="sports.length"
          :no-local-sorting="true"
        >
          <template slot="actions" slot-scope="row">
            <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
            <b-button
              size="sm"
              variant="primary"
              @click.stop="navigateSport(row.item)"
              class="mr-1"
              v-t="'form.edit'"
            />
            <b-button
              size="sm"
              variant="danger"
              @click.stop="deleteSport(row.item)"
              v-t="'form.delete'"
            />
          </template>
        </b-table>
        <div
          class="text-muted text-center pt-5"
          v-show="sports.length === 0 && !searchTerm"
        >{{$t('tables.noData', { term: searchTerm })}}</div>
        <div
          class="text-muted text-center pt-5"
          v-show="sports.length === 0 && searchTerm"
        >{{$t('tables.search', { entity: $tc('entities.sport', 2).toLowerCase()})}}</div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script src="./sport-list.js"></script>
