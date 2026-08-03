---
title: 'Display bus'
description: 'The ILI9341 panel and XPT2046 touch controller on one shared SPI bus.'
source: 'include/board_config.h'
---

The panel and its touch controller sit on the same SPI bus (HSPI). They share the clock and data lines and are told apart by their chip-select pins — so nothing else can hang off this bus.

| Function  | GPIO | Note                                          |
| --------- | ---: | --------------------------------------------- |
| TFT MOSI  |   13 | shared HSPI                                   |
| TFT MISO  |   12 | shared HSPI — unused, the panel is write-only |
| TFT SCLK  |   14 | shared HSPI                                   |
| TFT CS    |   15 | ILI9341 chip select                           |
| TFT DC    |    2 | data/command select                           |
| TFT RST   |    — | not wired (`-1`), held high on the board      |
| TFT BL    |   27 | PWM backlight                                 |
| Touch CS  |   33 | XPT2046 chip select                           |
| Touch IRQ |    — | not wired (`-1`) — touch is polled            |

## Clocks

The two devices run the bus at different speeds:

- **TFT** — 27 MHz by default (`TFT_SPI_FREQ_HZ`), or 40 MHz when built with `-DHW_TFT_FAST_SPI=1`, which is off by default and worth validating on your own board first.
- **Touch** — 2.5 MHz (`TOUCH_SPI_FREQ_HZ`), the XPT2046's ceiling.

## Touch is polled, not interrupt-driven

`PIN_TOUCH_IRQ` is `-1` — the touch IRQ line isn't wired. The firmware reads the controller by polling rather than waiting on an interrupt, so there is no pin to reserve for it.

## Backlight

`PIN_TFT_BL` (GPIO 27) drives the backlight through an LEDC PWM channel — channel 0 at 5 kHz, with the duty running 0–255 (default 200). The firmware owns the duty, so brightness is a software setting, not a fixed resistor.

The full board pinout, including the free and reserved pins, is on [Pinout](/technical/reference/pinout/).
