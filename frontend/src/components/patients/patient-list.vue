<template>
  <b-container fluid class="p-0">
    <b-row>
      <b-col>
        <b-table
          striped
          hover
          :items="patients"
          :fields="patientsFields"
          v-show="patients.length"
          :no-local-sorting="true"
          @row-clicked="navigatePatient"
        >
          <template slot="actions" slot-scope="row">
            <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
            <b-button
              size="sm"
              variant="primary"
              @click.stop="navigatePatient(row.item)"
              class="mr-1"
              v-t="'form.edit'"
            />
            <b-button
              size="sm"
              variant="danger"
              @click.stop="deletePatient(row.item)"
              v-t="'form.delete'"
            />
          </template>
        </b-table>
        <div
          class="text-muted text-center pt-5"
          v-show="patients.length === 0 && searchTerm"
        >{{$t('tables.noData', { term: searchTerm })}}</div>
        <div
          class="text-muted text-center pt-5"
          v-show="patients.length === 0 && !searchTerm"
        >{{$t('tables.search', { entity: $tc('entities.patient', 2).toLowerCase()})}}</div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script src="./patient-list.js"></script>
