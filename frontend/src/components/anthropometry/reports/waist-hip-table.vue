<template>
  <b-container fluid>
    <b-row>
      <b-col class="font-weight-bold" offset="6" v-t="'anthropometries.waistHip.risk'"></b-col>
    </b-row>
    <b-row>
      <b-col class="font-weight-bold" offset="1" v-t="'anthropometries.waistHip.age'"></b-col>
      <b-col class="font-weight-bold" v-t="'anthropometries.waistHip.low'"></b-col>
      <b-col class="font-weight-bold" v-t="'anthropometries.waistHip.moderate'"></b-col>
      <b-col class="font-weight-bold" v-t="'anthropometries.waistHip.high'"></b-col>
      <b-col class="font-weight-bold" v-t="'anthropometries.waistHip.veryHeight'"></b-col>
    </b-row>
    <b-row class="pt-2 pb-2 align-items-center">
      <b-col cols="1" class="font-weight-bold" v-t="'patients.gender.male'"></b-col>
      <b-col cols="11">
        <b-row class="p-0">
          <b-col>20-29</b-col>
          <b-col>&lt; 0.83</b-col>
          <b-col>0.83-0.88</b-col>
          <b-col>0.89-0.94</b-col>
          <b-col>&lt; 0.94</b-col>
        </b-row>
        <b-row class="p-0">
          <b-col>30-39</b-col>
          <b-col>&lt; 0.84</b-col>
          <b-col>0.84-0.91</b-col>
          <b-col>0.92-0.96</b-col>
          <b-col>&lt; 0.96</b-col>
        </b-row>
        <b-row class="p-0">
          <b-col>40-49</b-col>
          <b-col>&lt; 0.88</b-col>
          <b-col>0.88-0.95</b-col>
          <b-col>0.96-1.00</b-col>
          <b-col>&lt; 1.00</b-col>
        </b-row>
        <b-row class="p-0">
          <b-col>50-59</b-col>
          <b-col>&lt; 0.90</b-col>
          <b-col>0.90-0.96</b-col>
          <b-col>0.97-1.02</b-col>
          <b-col>&lt; 1.02</b-col>
        </b-row>
        <b-row class="p-0">
          <b-col>60-69</b-col>
          <b-col>&lt; 0.91</b-col>
          <b-col>0.91-0.98</b-col>
          <b-col>0.99-1.03</b-col>
          <b-col>&lt; 1.03</b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row class="pt-2 pb-2 align-items-center">
      <b-col cols="1" class="font-weight-bold" v-t="'patients.gender.female'"></b-col>
      <b-col cols="11">
        <b-row class="p-0">
          <b-col>20-29</b-col>
          <b-col>&lt; 0.71</b-col>
          <b-col>0.71-0.77</b-col>
          <b-col>0.78-0.82</b-col>
          <b-col>&lt; 0.82</b-col>
        </b-row>
        <b-row class="p-0">
          <b-col>30-39</b-col>
          <b-col>&lt; 0.72</b-col>
          <b-col>0.72-0.78</b-col>
          <b-col>0.79-0.84</b-col>
          <b-col>&lt; 0.84</b-col>
        </b-row>
        <b-row class="p-0">
          <b-col>40-49</b-col>
          <b-col>&lt; 0.73</b-col>
          <b-col>0.73-0.79</b-col>
          <b-col>0.80-0.87</b-col>
          <b-col>&lt; 0.87</b-col>
        </b-row>
        <b-row class="p-0">
          <b-col>50-59</b-col>
          <b-col>&lt; 0.74</b-col>
          <b-col>0.74-0.81</b-col>
          <b-col>0.82-0.88</b-col>
          <b-col>&lt; 0.88</b-col>
        </b-row>
        <b-row class="p-0">
          <b-col>60-69</b-col>
          <b-col>&lt; 0.76</b-col>
          <b-col>0.76-0.83</b-col>
          <b-col>0.84-0.90</b-col>
          <b-col>&lt; 0.90</b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>
