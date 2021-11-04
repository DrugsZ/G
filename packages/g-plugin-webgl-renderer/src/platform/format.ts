export const enum FormatTypeFlags {
  U8 = 0x01,
  U16,
  U32,
  S8,
  S16,
  S32,
  F16,
  F32,

  // Compressed texture formats.
  BC1 = 0x41,
  BC2,
  BC3,
  BC4_UNORM,
  BC4_SNORM,
  BC5_UNORM,
  BC5_SNORM,

  // Special-case packed texture formats.
  U16_PACKED_5551 = 0x61,

  // Depth/stencil texture formats.
  D24 = 0x81,
  D32F,
  D24S8,
  D32FS8,
}

export const enum FormatCompFlags {
  R = 0x01,
  RG = 0x02,
  RGB = 0x03,
  RGBA = 0x04,
  A = 0x05,
}

export function getFormatCompFlagsComponentCount(n: FormatCompFlags): number {
  // The number of components is the flag value. Easy.
  return n;
}

export const enum FormatFlags {
  None = 0b00000000,
  Normalized = 0b00000001,
  sRGB = 0b00000010,
  Depth = 0b00000100,
  Stencil = 0b00001000,
  RenderTarget = 0b00010000,
}

export function makeFormat(
  type: FormatTypeFlags,
  comp: FormatCompFlags,
  flags: FormatFlags,
): Format {
  return (type << 16) | (comp << 8) | flags;
}

export enum Format {
  ALPHA = makeFormat(FormatTypeFlags.U8, FormatCompFlags.A, FormatFlags.None),
  F16_RG = makeFormat(FormatTypeFlags.F16, FormatCompFlags.RG, FormatFlags.None),
  F16_RGB = makeFormat(FormatTypeFlags.F16, FormatCompFlags.RGB, FormatFlags.None),
  F16_RGBA = makeFormat(FormatTypeFlags.F16, FormatCompFlags.RGBA, FormatFlags.None),
  F32_R = makeFormat(FormatTypeFlags.F32, FormatCompFlags.R, FormatFlags.None),
  F32_RG = makeFormat(FormatTypeFlags.F32, FormatCompFlags.RG, FormatFlags.None),
  F32_RGB = makeFormat(FormatTypeFlags.F32, FormatCompFlags.RGB, FormatFlags.None),
  F32_RGBA = makeFormat(FormatTypeFlags.F32, FormatCompFlags.RGBA, FormatFlags.None),
  U8_R = makeFormat(FormatTypeFlags.U8, FormatCompFlags.R, FormatFlags.None),
  U8_R_NORM = makeFormat(FormatTypeFlags.U8, FormatCompFlags.R, FormatFlags.Normalized),
  U8_RG = makeFormat(FormatTypeFlags.U8, FormatCompFlags.RG, FormatFlags.None),
  U8_RG_NORM = makeFormat(FormatTypeFlags.U8, FormatCompFlags.RG, FormatFlags.Normalized),
  U8_RGB = makeFormat(FormatTypeFlags.U8, FormatCompFlags.RGB, FormatFlags.None),
  U8_RGB_NORM = makeFormat(FormatTypeFlags.U8, FormatCompFlags.RGB, FormatFlags.Normalized),
  U8_RGB_SRGB = makeFormat(
    FormatTypeFlags.U8,
    FormatCompFlags.RGB,
    FormatFlags.sRGB | FormatFlags.Normalized,
  ),
  U8_RGBA = makeFormat(FormatTypeFlags.U8, FormatCompFlags.RGBA, FormatFlags.None),
  U8_RGBA_NORM = makeFormat(FormatTypeFlags.U8, FormatCompFlags.RGBA, FormatFlags.Normalized),
  U8_RGBA_SRGB = makeFormat(
    FormatTypeFlags.U8,
    FormatCompFlags.RGBA,
    FormatFlags.sRGB | FormatFlags.Normalized,
  ),
  U16_R = makeFormat(FormatTypeFlags.U16, FormatCompFlags.R, FormatFlags.None),
  U16_R_NORM = makeFormat(FormatTypeFlags.U16, FormatCompFlags.R, FormatFlags.Normalized),
  U16_RG_NORM = makeFormat(FormatTypeFlags.U16, FormatCompFlags.RG, FormatFlags.Normalized),
  U16_RGBA_NORM = makeFormat(FormatTypeFlags.U16, FormatCompFlags.RGBA, FormatFlags.Normalized),
  U16_RGB = makeFormat(FormatTypeFlags.U16, FormatCompFlags.RGB, FormatFlags.None),
  U32_R = makeFormat(FormatTypeFlags.U32, FormatCompFlags.R, FormatFlags.None),
  U32_RG = makeFormat(FormatTypeFlags.U32, FormatCompFlags.RG, FormatFlags.None),
  S8_R = makeFormat(FormatTypeFlags.S8, FormatCompFlags.R, FormatFlags.None),
  S8_R_NORM = makeFormat(FormatTypeFlags.S8, FormatCompFlags.R, FormatFlags.Normalized),
  S8_RG_NORM = makeFormat(FormatTypeFlags.S8, FormatCompFlags.RG, FormatFlags.Normalized),
  S8_RGB_NORM = makeFormat(FormatTypeFlags.S8, FormatCompFlags.RGB, FormatFlags.Normalized),
  S8_RGBA_NORM = makeFormat(FormatTypeFlags.S8, FormatCompFlags.RGBA, FormatFlags.Normalized),
  S16_R = makeFormat(FormatTypeFlags.S16, FormatCompFlags.R, FormatFlags.None),
  S16_RG = makeFormat(FormatTypeFlags.S16, FormatCompFlags.RG, FormatFlags.None),
  S16_RG_NORM = makeFormat(FormatTypeFlags.S16, FormatCompFlags.RG, FormatFlags.Normalized),
  S16_RGB_NORM = makeFormat(FormatTypeFlags.S16, FormatCompFlags.RGB, FormatFlags.Normalized),
  S16_RGBA = makeFormat(FormatTypeFlags.S16, FormatCompFlags.RGBA, FormatFlags.None),
  S16_RGBA_NORM = makeFormat(FormatTypeFlags.S16, FormatCompFlags.RGBA, FormatFlags.Normalized),
  S32_R = makeFormat(FormatTypeFlags.S32, FormatCompFlags.R, FormatFlags.None),

  // Packed texture formats.
  U16_RGBA_5551 = makeFormat(
    FormatTypeFlags.U16_PACKED_5551,
    FormatCompFlags.RGBA,
    FormatFlags.Normalized,
  ),

  // Compressed
  BC1 = makeFormat(FormatTypeFlags.BC1, FormatCompFlags.RGBA, FormatFlags.None),
  BC1_SRGB = makeFormat(FormatTypeFlags.BC1, FormatCompFlags.RGBA, FormatFlags.sRGB),
  BC2 = makeFormat(FormatTypeFlags.BC2, FormatCompFlags.RGBA, FormatFlags.None),
  BC2_SRGB = makeFormat(FormatTypeFlags.BC2, FormatCompFlags.RGBA, FormatFlags.sRGB),
  BC3 = makeFormat(FormatTypeFlags.BC3, FormatCompFlags.RGBA, FormatFlags.None),
  BC3_SRGB = makeFormat(FormatTypeFlags.BC3, FormatCompFlags.RGBA, FormatFlags.sRGB),
  BC4_UNORM = makeFormat(FormatTypeFlags.BC4_UNORM, FormatCompFlags.R, FormatFlags.None),
  BC4_SNORM = makeFormat(FormatTypeFlags.BC4_SNORM, FormatCompFlags.R, FormatFlags.None),
  BC5_UNORM = makeFormat(FormatTypeFlags.BC5_UNORM, FormatCompFlags.RG, FormatFlags.None),
  BC5_SNORM = makeFormat(FormatTypeFlags.BC5_SNORM, FormatCompFlags.RG, FormatFlags.None),

  // Depth/Stencil
  D24 = makeFormat(FormatTypeFlags.D24, FormatCompFlags.R, FormatFlags.Depth),
  D24_S8 = makeFormat(
    FormatTypeFlags.D24S8,
    FormatCompFlags.RG,
    FormatFlags.Depth | FormatFlags.Stencil,
  ),
  D32F = makeFormat(FormatTypeFlags.D32F, FormatCompFlags.R, FormatFlags.Depth),
  D32F_S8 = makeFormat(
    FormatTypeFlags.D32FS8,
    FormatCompFlags.RG,
    FormatFlags.Depth | FormatFlags.Stencil,
  ),

  // Special RT formats for preferred backend support.
  U8_RGB_RT = makeFormat(FormatTypeFlags.U8, FormatCompFlags.RGB, FormatFlags.RenderTarget),
  U8_RGBA_RT = makeFormat(FormatTypeFlags.U8, FormatCompFlags.RGBA, FormatFlags.RenderTarget),
  U8_RGBA_RT_SRGB = makeFormat(
    FormatTypeFlags.U8,
    FormatCompFlags.RGBA,
    FormatFlags.RenderTarget | FormatFlags.sRGB,
  ),
}

export function getFormatCompFlags(fmt: Format): FormatCompFlags {
  return (fmt >>> 8) & 0xff;
}

export function getFormatTypeFlags(fmt: Format): FormatTypeFlags {
  return (fmt >>> 16) & 0xff;
}

export function getFormatFlags(fmt: Format): FormatFlags {
  return fmt & 0xff;
}

export function getFormatTypeFlagsByteSize(typeFlags: FormatTypeFlags): 1 | 2 | 4 {
  switch (typeFlags) {
    case FormatTypeFlags.F32:
    case FormatTypeFlags.U32:
    case FormatTypeFlags.S32:
      return 4;
    case FormatTypeFlags.U16:
    case FormatTypeFlags.S16:
    case FormatTypeFlags.F16:
      return 2;
    case FormatTypeFlags.U8:
    case FormatTypeFlags.S8:
      return 1;
    default:
      throw 'whoops';
  }
}

/**
 * Gets the byte size for an individual component.
 * e.g. for F32_RGB, this will return "4", since F32 has 4 bytes.
 */
export function getFormatCompByteSize(fmt: Format): 1 | 2 | 4 {
  return getFormatTypeFlagsByteSize(getFormatTypeFlags(fmt));
}

export function getFormatComponentCount(fmt: Format): number {
  return getFormatCompFlagsComponentCount(getFormatCompFlags(fmt));
}

export function getFormatByteSize(fmt: Format): number {
  const typeByteSize = getFormatTypeFlagsByteSize(getFormatTypeFlags(fmt));
  const componentCount = getFormatCompFlagsComponentCount(getFormatCompFlags(fmt));
  return typeByteSize * componentCount;
}

export function setFormatFlags(fmt: Format, flags: FormatFlags): Format {
  return (fmt & 0xffffff00) | flags;
}

export function setFormatComponentCount(fmt: Format, compFlags: FormatCompFlags): Format {
  return (fmt & 0xffff00ff) | (compFlags << 8);
}