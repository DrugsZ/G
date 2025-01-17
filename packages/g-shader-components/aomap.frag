#ifdef USE_AOMAP
  // reads channel R, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
  float ambientOcclusion = ( texture2D( u_AoMap, v_Uv2 ).r - 1.0 ) * aoMapIntensity + 1.0;

  reflectedLight.indirectDiffuse *= ambientOcclusion;

  // #if defined( USE_ENVMAP ) && defined( STANDARD )
  //   float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
  //   reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
  // #endif

#endif