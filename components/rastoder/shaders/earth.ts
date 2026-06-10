/**
 * Erd-Oberflächen-Shader.
 * - Mischt Tag-Textur und Nacht-Lichter abhängig vom Sonnen-Winkel.
 * - Spekulare Highlights nur auf Ozeanen (specularMap).
 * - Sanfter atmosphärischer Rim (Fresnel) an der Tag/Nacht-Grenze.
 *
 * Erwartete uniforms:
 *   uDay, uNight, uSpecular, uClouds (sampler2D)
 *   uSunDirection (vec3, normalisiert, Welt-Raum)
 *   uTime (float)
 */
export const earthVertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vPositionW;

  void main() {
    vUv = uv;
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vPositionW = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`

export const earthFragmentShader = /* glsl */ `
  uniform sampler2D uDay;
  uniform sampler2D uNight;
  uniform sampler2D uSpecular;
  uniform sampler2D uClouds;
  uniform vec3 uSunDirection;
  uniform vec3 uAtmosphereColor;
  uniform float uTime;

  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vPositionW;

  void main() {
    vec3 normal = normalize(vNormalW);
    vec3 viewDir = normalize(cameraPosition - vPositionW);

    // Sonnen-Einstrahlung (Lambert), weich um den Terminator
    float sunOrientation = dot(normal, uSunDirection);
    float dayMix = smoothstep(-0.25, 0.35, sunOrientation);

    vec3 dayColor = texture2D(uDay, vUv).rgb;
    vec3 nightColor = texture2D(uNight, vUv).rgb;

    // Wolken driften langsam in Längsrichtung
    vec2 cloudUv = vUv + vec2(uTime * 0.004, 0.0);
    float clouds = texture2D(uClouds, cloudUv).r;

    // Ozean-Glanz: specularMap (weiß = Wasser) + Blinn-Phong
    float oceanMask = texture2D(uSpecular, vUv).r;
    vec3 halfDir = normalize(uSunDirection + viewDir);
    float spec = pow(max(dot(normal, halfDir), 0.0), 90.0);
    spec *= oceanMask * dayMix;

    // Tag/Nacht-Mischung
    vec3 surface = mix(nightColor * 1.4, dayColor, dayMix);

    // Wolken: tagsüber weiß, nachts gedämpft
    vec3 cloudColor = mix(vec3(0.02), vec3(1.0), dayMix);
    surface = mix(surface, cloudColor, clouds * (0.35 + 0.45 * dayMix));

    // Spekular-Highlight hinzufügen
    surface += vec3(1.0, 0.95, 0.85) * spec * 0.8;

    // Fresnel-Rim als Atmosphären-Andeutung an der beleuchteten Kante
    float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 3.0);
    surface += uAtmosphereColor * fresnel * dayMix * 0.6;

    gl_FragColor = vec4(surface, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`

/**
 * Äußere Atmosphären-Hülle (separate, leicht größere Backside-Sphere).
 * Erzeugt das weiche Glühen am Erd-Horizont.
 */
export const atmosphereVertexShader = /* glsl */ `
  varying vec3 vNormalW;
  varying vec3 vPositionW;
  void main() {
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vPositionW = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`

export const atmosphereFragmentShader = /* glsl */ `
  uniform vec3 uSunDirection;
  uniform vec3 uAtmosphereDay;
  uniform vec3 uAtmosphereTwilight;

  varying vec3 vNormalW;
  varying vec3 vPositionW;

  void main() {
    vec3 normal = normalize(vNormalW);
    vec3 viewDir = normalize(cameraPosition - vPositionW);

    // Backside-Sphere: Rim ist dort, wo View streifend trifft
    float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 2.0);

    float sunOrientation = dot(normal, uSunDirection);
    float dayMix = smoothstep(-0.5, 0.5, sunOrientation);

    vec3 color = mix(uAtmosphereTwilight, uAtmosphereDay, dayMix);
    float alpha = fresnel * smoothstep(-0.35, 0.2, sunOrientation);

    gl_FragColor = vec4(color, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`
