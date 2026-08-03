---
title: 'CAN header'
description: 'The two TWAI pins on the expansion header, and the transceiver they need.'
source: 'include/board_config.h'
---

CAN runs off the ESP32's built-in TWAI controller, broken out to the expansion header.

| Function | GPIO | Note                 |
| -------- | ---: | -------------------- |
| TWAI TX  |   25 | to the transceiver   |
| TWAI RX  |   32 | from the transceiver |

## Bus speed

The default is 500 kbit/s (`CAN_SPEED_KBPS`), the most common rate on modern vehicle buses. The profile you load can change what the frames mean, but the bit rate is a firmware setting.

## You still need a transceiver

The GPIO pins are logic-level TWAI — they are **not** a CAN bus on their own. Between them and the vehicle sits a transceiver (the reference build uses an NXP TJA1051), which converts the ESP32's single-ended signals to the differential CAN-H / CAN-L pair. See the [Hardware & BOM](/technical/reference/hardware-bom/) for the part.

:::caution
`TWAI TX` must be an output-capable pin. GPIO 34–39 are input-only on the ESP32 and cannot drive it — keep the header on 25 / 32 unless you know the alternative pin can output.
:::

The full board pinout is on [Pinout](/technical/reference/pinout/).
