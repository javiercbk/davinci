<template>
  <b-container fluid class="pl-0 pr-0 pb-2">
    <b-row class="font-weight-bold">
      <b-col md="4" sm="6" v-t="'anthropometries.measurementsGroups'"/>
      <b-col md="8" sm="6">
        <b-row class="p-0">
          <b-col v-t="'anthropometries.measurement'"/>
          <b-col v-t="'anthropometries.results'"/>
          <b-col v-t="'anthropometries.scoreZ'"/>
          <b-col v-if="hasComparison"/>
        </b-row>
      </b-col>
    </b-row>
    <b-row
      v-for="(group, groupIndex) in measurementGroups"
      :key="group.name"
      class="measurement-group-row"
    >
      <measurement-group
        :group-name="group.name"
        :measurements="group.measurements"
        :comparison="comparisonGroups[groupIndex].measurements"
      />
    </b-row>
    <b-row class="font-weight-bold pt-4 pb-4">
      <b-col v-if="comparisonMassesPercentageData" cols="12" md="6">
        <div v-t="'anthropometries.fiveMasses'"></div>
        <div>
          <pie-chart :value="comparisonMassesPercentageData"/>
        </div>
      </b-col>
      <b-col cols="12" md="6">
        <div v-t="'anthropometries.fiveMasses'"></div>
        <div>
          <pie-chart :value="massesPercentageData"/>
        </div>
      </b-col>
      <b-col v-if="comparisonScoreZPlotData" cols="12" md="6">
        <div v-t="'anthropometries.scoreZ'"></div>
        <div>
          <vertical-independent-plot :value="comparisonScoreZPlotData"/>
        </div>
      </b-col>
      <b-col cols="12" md="6">
        <div v-t="'anthropometries.scoreZ'"></div>
        <div>
          <vertical-independent-plot :value="scoreZPlotData"/>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-container fluid class="p-0">
          <b-row>
            <b-col v-t="'anthropometries.mass'"/>
            <b-col v-t="'anthropometries.percentage'"/>
            <!-- fixme show in user's unit -->
            <b-col>Kg</b-col>
            <b-col v-t="'anthropometries.scoreZ'"/>
          </b-row>
          <mass-row v-for="m in massesData" :key="m.key" :mass="m"/>
          <hr>
          <b-row>
            <b-col>
              <h3 v-t="'anthropometries.phantomScoreZ'"></h3>
            </b-col>
          </b-row>
          <b-row class="font-weight-bold pt-4 pb-4">
            <b-col cols="12" md="6" v-if="hasComparison">
              <div v-t="'anthropometries.basicScoreZ'"></div>
              <div>
                <vertical-independent-plot :value="comparisonBasicScoreZPlotData"/>
              </div>
            </b-col>
            <b-col cols="12" md="6">
              <div v-t="'anthropometries.basicScoreZ'"></div>
              <div>
                <vertical-independent-plot :value="basicScoreZPlotData"/>
              </div>
            </b-col>
            <b-col cols="12" md="6" v-if="hasComparison">
              <div v-t="'anthropometries.basicScoreZ'"></div>
              <div>
                <vertical-independent-plot :value="comparisonDiameterScoreZPlotData"/>
              </div>
            </b-col>
            <b-col cols="12" md="6">
              <div v-t="'anthropometries.diameterScoreZ'"></div>
              <div>
                <vertical-independent-plot :value="diameterScoreZPlotData"/>
              </div>
            </b-col>
          </b-row>
          <b-row class="font-weight-bold pt-4 pb-4">
            <b-col cols="12" md="6" v-if="hasComparison">
              <div v-t="'anthropometries.perimetersScoreZ'"></div>
              <div>
                <vertical-independent-plot :value="comparisonPerimetersScoreZPlotData"/>
              </div>
            </b-col>
            <b-col cols="12" md="6">
              <div v-t="'anthropometries.perimetersScoreZ'"></div>
              <div>
                <vertical-independent-plot :value="perimetersScoreZPlotData"/>
              </div>
            </b-col>
            <b-col cols="12" md="6" v-if="hasComparison">
              <div v-t="'anthropometries.perimetersScoreZ'"></div>
              <div>
                <vertical-independent-plot :value="comparisonSkinFoldsscoreZPlotData"/>
              </div>
            </b-col>
            <b-col cols="12" md="6">
              <div v-t="'anthropometries.skinFoldsScoreZ'"></div>
              <div>
                <vertical-independent-plot :value="skinFoldsscoreZPlotData"/>
              </div>
            </b-col>
          </b-row>
          <hr>
          <b-row class="font-weight-bold pt-4 pb-4">
            <b-col>
              <div>
                <span v-t="'anthropometries.metabolism.energyExpenditure'" class="pr-1"></span>
                <span class="pr-1">-</span>
                <span class="pr-1" v-t="'anthropometries.metabolism.idealWeightPrediction'"></span>
                <span class="pr-1">-</span>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="4" md="2" v-t="'anthropometries.metabolism.basalMetabolicRate'"></b-col>
            <b-col :cols="hasComparison ? 4 : 8" md="2">{{bmr | decimal(2)}}</b-col>
            <b-col v-if="hasComparison" cols="4" md="2">
              <template v-if="bmr !== comparisonBmr">{{comparisonBmr | decimal(2)}}</template>
              <comparison-icon
                v-if="hasComparison"
                class="pl-1"
                :comp="comparisonMasses.scoresZ.total"
                :val="masses.scoresZ.total"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col
              cols="4"
              md="2"
              v-t="'anthropometries.metabolism.estimatedTotalEnergyExpenditure'"
            ></b-col>
            <b-col :cols="hasComparison ? 4 : 8" md="2">{{etee | decimal(2) }}</b-col>
            <b-col v-if="hasComparison" cols="4" md="2">
              <template v-if="etee !== comparisonEtee">{{comparisonEtee | decimal(2)}}</template>
              <comparison-icon
                v-if="hasComparison"
                class="pl-1"
                :comp="comparisonMasses.scoresZ.total"
                :val="masses.scoresZ.total"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="4" md="2" v-t="'anthropometries.metabolism.idealWeight'"></b-col>
            <b-col cols="4" md="2">{{iWeight | decimal(2) }}</b-col>
            <b-col v-if="hasComparison" cols="4" md="2">
              <template v-if="comparisonIWeight !== iWeight">{{comparisonIWeight | decimal(2)}}</template>
              <comparison-icon
                class="pl-1"
                :comp="comparisonMasses.scoresZ.total"
                :val="masses.scoresZ.total"
              />
            </b-col>
            <b-col cols="12" md="2">
              <b-row>
                <b-col v-t="'form.range'"></b-col>
              </b-row>
              <b-row>
                <b-col
                  v-if="hasComparison"
                  class="text-muted"
                >{{comparisonIWeightRange.min | decimal(2)}}</b-col>
                <b-col>{{iWeightRange.min | decimal(2)}}</b-col>
                <b-col v-if="hasComparison">
                  <comparison-icon
                    class="pl-1"
                    :comp="comparisonIWeightRange.min"
                    :val="iWeightRange.min"
                  />
                </b-col>
                <b-col
                  v-if="hasComparison"
                  class="text-muted"
                >{{comparisonIWeightRange.max | decimal(2)}}</b-col>
                <b-col>{{iWeightRange.max | decimal(2)}}</b-col>
                <b-col v-if="hasComparison">
                  <comparison-icon
                    class="pl-1"
                    :comp="comparisonIWeightRange.max"
                    :val="iWeightRange.max"
                  />
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <b-row class="pt-3">
            <b-col v-t="'anthropometries.waistHip.description'"></b-col>
          </b-row>
          <b-row>
            <waist-hip-table/>
          </b-row>
          <hr>
          <b-row class="font-weight-bold pt-4 pb-4">
            <b-col>
              <div v-t="'anthropometries.somatotype'"></div>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="hasComparison" md="6">
              <somatocard-diagram
                :value="comparisonSomatocardData"
                :top-center-label="mesomorphicLabel"
                :bottom-left-label="endomorphicLabel"
                :bottom-right-label="ectomorphicLabel"
              ></somatocard-diagram>
            </b-col>
            <b-col :offset-md="hasComparison ? 0 : 2" :md="hasComparison ? 6 : 8">
              <somatocard-diagram
                :value="somatocardData"
                :top-center-label="mesomorphicLabel"
                :bottom-left-label="endomorphicLabel"
                :bottom-right-label="ectomorphicLabel"
              ></somatocard-diagram>
            </b-col>
          </b-row>
          <b-row>
            <b-col offset-md="3" cols="12" md="2">
              <span class="endo pr-1" v-t="'anthropometries.somatotypes.endomorphicShort'"></span>
              <span
                v-if="hasComparison && comparisonSomatotype.endo !== somatotype.endo"
                class="endo pr-1 text-muted"
              >{{comparisonSomatotype.endo | decimal(2)}}</span>
              <span class="endo pr-1">{{somatotype.endo | decimal(2)}}</span>
              <span v-if="hasComparison" class="endo">
                <comparison-icon :comp="comparisonSomatotype.endo" :val="somatotype.endo"/>
              </span>
            </b-col>
            <b-col cols="12" md="2">
              <span class="meso pr-1" v-t="'anthropometries.somatotypes.mesomorphicShort'"></span>
              <span
                v-if="hasComparison && comparisonSomatotype.meso !== somatotype.meso"
                class="meso pr-1 text-muted"
              >{{comparisonSomatotype.meso | decimal(2)}}</span>
              <span class="meso pr-1">{{somatotype.meso | decimal(2)}}</span>
              <span v-if="hasComparison" class="meso">
                <comparison-icon :comp="comparisonSomatotype.meso" :val="somatotype.meso"/>
              </span>
            </b-col>
            <b-col cols="12" md="2">
              <span class="ecto pr-1" v-t="'anthropometries.somatotypes.ectomorphicShort'"></span>
              <span
                v-if="hasComparison && comparisonSomatotype.ecto !== somatotype.ecto"
                class="ecto pr-1 text-muted"
              >{{comparisonSomatotype.ecto | decimal(2)}}</span>
              <span class="ecto pr-1">{{somatotype.ecto | decimal(2)}}</span>
              <span v-if="hasComparison" class="ecto">
                <comparison-icon :comp="comparisonSomatotype.ecto" :val="somatotype.ecto"/>
              </span>
            </b-col>
          </b-row>
        </b-container>
      </b-col>
    </b-row>
  </b-container>
</template>

<style lang="scss" scoped src="./anthropometry-report.scss"></style>

<script src="./anthropometry-report.js"></script>
