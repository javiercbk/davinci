#include <math.h>
#include <emscripten.h>

typedef struct {
  double* bodyMass;
  double* stature;
  double* sittingHeight;
  double* biacromial;
  double* transverseChest;
  double* anteriorPosteriorChestDepth;
  double* biiliocristal;
  double* humerusBiepicondylar;
  double* femurBiepicondylar;
  double* head;
  double* armRelaxed;
  double* armFlexedTensed;
  double* forearm;
  double* chest;
  double* minWaist;
  double* maxThighUpper;
  double* maxCalf;
  double* triceps;
  double* subscapular;
  double* supraspinal;
  double* abdominal;
  double* frontThigh;
  double* medialCalf;
} anthropometry;

typedef struct {
  double bodyMass;
  double stature;
  double sittingHeight;
  double biacromial;
  double transverseChest;
  double anteriorPosteriorChestDepth;
  double biiliocristal;
  double humerusBiepicondylar;
  double femurBiepicondylar;
  double head;
  double armRelaxed;
  double armFlexedTensed;
  double forearm;
  double chest;
  double minWaist;
  double maxThighUpper;
  double maxCalf;
  double triceps;
  double subscapular;
  double supraspinal;
  double abdominal;
  double frontThigh;
  double medialCalf;
} anthropometryMean;

EMSCRIPTEN_KEEPALIVE
double skinMassSuperficialArea (double sfArea, double bodyMass, double stature) {
  return (sfArea * pow(bodyMass, 0.425) * pow(stature, 0.725)) / 10000.0;
};
