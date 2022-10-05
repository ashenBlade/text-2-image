from __future__ import annotations

import math
from functools import cached_property
from typing import Iterable, SupportsIndex


class TextImage:
    DEFAULT_ENCODING = 'utf-8'

    data: bytes

    def __init__(self, data: Iterable[int] | bytes | Iterable[SupportsIndex],
                 encoding: str = DEFAULT_ENCODING):
        self.data = bytes(data)
        if not self.data:
            raise ValueError('Data for image is not provided')
        self._encoding = encoding

    @cached_property
    def size(self) -> tuple[int, int]:
        side_size = math.ceil(math.sqrt(math.ceil(len(self.data) / 3)))
        return side_size, side_size

    @cached_property
    def text(self) -> str:
        return self.data.decode(self._encoding)

    @classmethod
    def from_text(cls, text: str, encoding=DEFAULT_ENCODING) -> TextImage:
        return cls(text.encode(encoding=encoding), encoding)
