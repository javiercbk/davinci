<template>
  <div>
    <anthropometry-measurements
      name="bodyMass"
      :label="$t('anthropometries.measurements.bodyMass')"
      v-model="anthropometry.bodyMass"
    />
    <anthropometry-measurements
      name="stature"
      :label="$t('anthropometries.measurements.stature')"
      v-model="anthropometry.stature"
    />
    <anthropometry-measurements
      name="sittingHeight"
      :label="$t('anthropometries.measurements.sittingHeight')"
      v-model="anthropometry.sittingHeight"
    />
    <anthropometry-measurements
      name="armSpan"
      :label="$t('anthropometries.measurements.armSpan')"
      v-model="anthropometry.armSpan"
    />
    <anthropometry-measurements
      name="acromialRadial"
      :label="$t('anthropometries.measurements.acromialRadial')"
      v-model="anthropometry.acromialRadial"
    />
    <anthropometry-measurements
      name="radialeStylionRadiale"
      :label="$t('anthropometries.measurements.radialeStylionRadiale')"
      v-model="anthropometry.radialeStylionRadiale"
    />
    <anthropometry-measurements
      name="midstylionDactylion"
      :label="$t('anthropometries.measurements.midstylionDactylion')"
      v-model="anthropometry.midstylionDactylion"
    />
    <anthropometry-measurements
      name="iliospinaleHeight"
      :label="$t('anthropometries.measurements.iliospinaleHeight')"
      v-model="anthropometry.iliospinaleHeight"
    />
    <anthropometry-measurements
      name="trochanterionHeight"
      :label="$t('anthropometries.measurements.trochanterionHeight')"
      v-model="anthropometry.trochanterionHeight"
    />
    <anthropometry-measurements
      name="trochanterionTibialeLaterale"
      :label="$t('anthropometries.measurements.trochanterionTibialeLaterale')"
      v-model="anthropometry.trochanterionTibialeLaterale"
    />
    <anthropometry-measurements
      name="tibialeLateraleHeight"
      :label="$t('anthropometries.measurements.tibialeLateraleHeight')"
      v-model="anthropometry.tibialeLateraleHeight"
    />
    <anthropometry-measurements
      name="tibialeMedialeSphyrionTibiale"
      :label="$t('anthropometries.measurements.tibialeMedialeSphyrionTibiale')"
      v-model="anthropometry.tibialeMedialeSphyrionTibiale"
    />
    <anthropometry-measurements
      name="foot"
      :label="$t('anthropometries.measurements.foot')"
      v-model="anthropometry.foot"
    />
    <anthropometry-measurements
      name="biacromial"
      :label="$t('anthropometries.measurements.biacromial')"
      v-model="anthropometry.biacromial"
    />
    <anthropometry-measurements
      name="transverseChest"
      :label="$t('anthropometries.measurements.transverseChest')"
      v-model="anthropometry.transverseChest"
    />
    <anthropometry-measurements
      name="anteriorPosteriorChestDepth"
      :label="$t('anthropometries.measurements.anteriorPosteriorChestDepth')"
      v-model="anthropometry.anteriorPosteriorChestDepth"
    />
    <anthropometry-measurements
      name="biiliocristal"
      :label="$t('anthropometries.measurements.biiliocristal')"
      v-model="anthropometry.biiliocristal"
    />
    <anthropometry-measurements
      name="humerusBiepicondylar"
      :label="$t('anthropometries.measurements.humerusBiepicondylar')"
      v-model="anthropometry.humerusBiepicondylar"
    />
    <anthropometry-measurements
      name="femurBiepicondylar"
      :label="$t('anthropometries.measurements.femurBiepicondylar')"
      v-model="anthropometry.femurBiepicondylar"
    />
    <anthropometry-measurements
      name="wristBistiloid"
      :label="$t('anthropometries.measurements.wristBistiloid')"
      v-model="anthropometry.wristBistiloid"
    />
    <anthropometry-measurements
      name="ankleBimaleolar"
      :label="$t('anthropometries.measurements.ankleBimaleolar')"
      v-model="anthropometry.ankleBimaleolar"
    />
    <anthropometry-measurements
      name="hand"
      :label="$t('anthropometries.measurements.hand')"
      v-model="anthropometry.hand"
    />
    <anthropometry-measurements
      name="head"
      :label="$t('anthropometries.measurements.head')"
      v-model="anthropometry.head"
    />
    <anthropometry-measurements
      name="neck"
      :label="$t('anthropometries.measurements.neck')"
      v-model="anthropometry.neck"
    />
    <anthropometry-measurements
      name="armRelaxed"
      :label="$t('anthropometries.measurements.armRelaxed')"
      v-model="anthropometry.armRelaxed"
    />
    <anthropometry-measurements
      name="armFlexedTensed"
      :label="$t('anthropometries.measurements.armFlexedTensed')"
      v-model="anthropometry.armFlexedTensed"
    />
    <anthropometry-measurements
      name="forearm"
      :label="$t('anthropometries.measurements.forearm')"
      v-model="anthropometry.forearm"
    />
    <anthropometry-measurements
      name="wrist"
      :label="$t('anthropometries.measurements.wrist')"
      v-model="anthropometry.wrist"
    />
    <anthropometry-measurements
      name="chest"
      :label="$t('anthropometries.measurements.chest')"
      v-model="anthropometry.chest"
    />
    <anthropometry-measurements
      name="minWaist"
      :label="$t('anthropometries.measurements.minWaist')"
      v-model="anthropometry.minWaist"
    />
    <anthropometry-measurements
      name="maxAbdominal"
      :label="$t('anthropometries.measurements.maxAbdominal')"
      v-model="anthropometry.maxAbdominal"
    />
    <anthropometry-measurements
      name="maxGlutealHip"
      :label="$t('anthropometries.measurements.maxGlutealHip')"
      v-model="anthropometry.maxGlutealHip"
    />
    <anthropometry-measurements
      name="maxThighUpper"
      :label="$t('anthropometries.measurements.maxThighUpper')"
      v-model="anthropometry.maxThighUpper"
    />
    <anthropometry-measurements
      name="midThigh"
      :label="$t('anthropometries.measurements.midThigh')"
      v-model="anthropometry.midThigh"
    />
    <anthropometry-measurements
      name="maxCalf"
      :label="$t('anthropometries.measurements.maxCalf')"
      v-model="anthropometry.maxCalf"
    />
    <anthropometry-measurements
      name="minAnkle"
      :label="$t('anthropometries.measurements.minAnkle')"
      v-model="anthropometry.minAnkle"
    />
    <anthropometry-measurements
      name="triceps"
      :label="$t('anthropometries.measurements.triceps')"
      v-model="anthropometry.triceps"
    />
    <anthropometry-measurements
      name="subscapular"
      :label="$t('anthropometries.measurements.subscapular')"
      v-model="anthropometry.subscapular"
    />
    <anthropometry-measurements
      name="biceps"
      :label="$t('anthropometries.measurements.biceps')"
      v-model="anthropometry.biceps"
    />
    <anthropometry-measurements
      name="iliacCrest"
      :label="$t('anthropometries.measurements.iliacCrest')"
      v-model="anthropometry.iliacCrest"
    />
    <anthropometry-measurements
      name="supraspinal"
      :label="$t('anthropometries.measurements.supraspinal')"
      v-model="anthropometry.supraspinal"
    />
    <anthropometry-measurements
      name="abdominal"
      :label="$t('anthropometries.measurements.abdominal')"
      v-model="anthropometry.abdominal"
    />
    <anthropometry-measurements
      name="frontThigh"
      :label="$t('anthropometries.measurements.frontThigh')"
      v-model="anthropometry.frontThigh"
    />
    <anthropometry-measurements
      name="medialCalf"
      :label="$t('anthropometries.measurements.medialCalf')"
      v-model="anthropometry.medialCalf"
    />
    <anthropometry-measurements
      name="forearmSkinFold"
      :label="$t('anthropometries.measurements.forearmSkinFold')"
      v-model="anthropometry.forearmSkinFold"
    />
  </div>
</template>

<script src="./anthropometry-raw-form.js"></script>
